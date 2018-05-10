<?php

class Reports_Model extends Model{

    public function __construct() {
        parent::__construct();
    }
    /* REPORTS */
    public function listsBooking( $options=array() ){

        $data = array();
        $data['total_qty'] = 0;
        $data['total_receipt'] = 0;
        $data['total_master'] = 0;
        $data['total_balance'] = 0;
        $data['total'] = 0;

        $data['total_cancel'] = 0;
        $data['total_master_cancel'] = 0;
        $data['total_qty_cancel'] = 0;

        $field = "b.book_date
                  , b.book_code
                  , b.book_master_deposit
                  , b.book_master_full_payment
                  , b.book_receipt
                  , b.status

                  , ser.ser_name
                  , ser.ser_code

                  , (SELECT COALESCE(SUM(booking_list.book_list_qty),0) FROM booking_list WHERE booking_list.book_code=b.book_code AND booking_list.book_list_code IN ('1','2','3') ) as qty

                  , agen.agen_fname
                  , agen.agen_lname
                  , agen.agen_nickname

                  , ac.agen_com_name

                  , s.user_fname
                  , s.user_lname
                  , s.user_nickname";
        $table = "booking b 
                  LEFT JOIN period per ON b.per_id=per.per_id
                  LEFT JOIN series ser ON b.ser_id=ser.ser_id
                  LEFT JOIN agency agen ON b.agen_id=agen.agen_id
                  LEFT JOIN agency_company ac ON agen.agency_company_id=ac.agen_com_id
                  LEFT JOIN user s ON b.user_id=s.user_id";

        $options = array_merge( array(
            'date' => isset($_REQUEST["date"]) ? $_REQUEST["date"] : date("Y-m-d"),
        ),$options );

        $where_str = '';
        $where_arr = array();

        // if( !empty($options["date"]) ){
        //     $where_str .= !empty($where_str) ? " AND " : "";
        //     $where_str .= "(book_date BETWEEN :s AND :e)";
        //     $where_arr[":s"] = date("Y-m-d 00:00:00", strtotime($options["date"]));
        //     $where_arr[":e"] = date("Y-m-d 23:59:59", strtotime($options["date"]));
        // }
        if( !empty($options["start"]) && !empty($options["end"]) ){
            $where_str .= !empty($where_str) ? " AND " : "";
            $where_str .= "(book_date BETWEEN :s AND :e)";
            $where_arr[":s"] = $options["start"];
            $where_arr[":e"] = $options["end"];
        }
        if( !empty($options["country"]) ){
            $where_str .= !empty($where_str) ? " AND " : "";
            $where_str .= "ser.country_id=:country";
            $where_arr[":country"] = $options["country"];
        }
        if( !empty($options["series"]) ){
            $where_str .= !empty($where_str) ? " AND " : "";
            $where_str .= "b.ser_id=:series";
            $where_arr[":series"] = $options["series"];
        }
        if( !empty($options["sale"]) ){
            $where_str .= !empty($where_str) ? " AND " : "";
            $where_str .= "b.user_id=:sale";
            $where_arr[":sale"] = $options["sale"];
        }
        if( !empty($options["company"]) ){
            $where_str .= !empty($where_str) ? " AND " : "";
            $where_str .= "agen.agency_company_id=:company";
            $where_arr[":company"] = $options["company"];
        }
        if( !empty($options["agency"]) ){
            $where_str .= !empty($where_str) ? " AND " : "";
            $where_str .= "b.agen_id=:agency";
            $where_arr[":agency"] = $options["agency"];
        }
        if( $options["status"] != null ){

            $status = '';
            foreach ($options["status"] as $key => $value) {
                $status .= !empty($status) ? " OR " : "";
                $status .= "b.status={$value}";
            }
            if( !empty($status) ){
                $where_str .= !empty($where_str) ? " AND " : "";
                $where_str .= "({$status})";
            }
        }

        $where_str = !empty($where_str) ? "WHERE {$where_str}" : "";
        $results = $this->db->select("SELECT {$field} FROM {$table} {$where_str}", $where_arr);
        foreach ($results as $key => $value) {
            $data['lists'][$key] = $value;
            $data['lists'][$key]['book_master'] = $value["book_master_deposit"] + $value["book_master_full_payment"];
            $data['lists'][$key]['book_balance'] = $data['lists'][$key]['book_master'] - $value["book_receipt"];
            $data['lists'][$key]['status_arr'] = $this->query('booking')->getStatus($value["status"]);

            $data['total_qty'] += $value["qty"];
            $data['total_receipt'] += $value["book_receipt"];
            $data['total_master'] += $data['lists'][$key]['book_master'];
            $data['total_balance'] += $data['lists'][$key]['book_balance'];

            if( $value["status"] == 40 ){
                $data['total_master_cancel'] += $data['lists'][$key]['book_master'];
                $data['total_qty_cancel'] += $value["qty"];
                $data['total_cancel']++;
            }

            $data['total']++;
        }

        $data['options'] = $options;
        return $data;
    }

    public function listsReceivedDaily( $options=array() ){
        $data = array();
        $data["total_receipt"] = 0;
        $data["total"] = 0;

        $data["total_dep_pt"] = 0;
        $data["total_dep"] = 0;
        $data["total_full_pt"] = 0;
        $data["total_full"] = 0;

        $_field = "p.*, bb.bankbook_code, b.invoice_code, ser.ser_code, per.per_date_start, per.per_date_end";
        $_table = "payment p 
                   LEFT JOIN booking b ON p.book_id=b.book_id
                   LEFT JOIN bankbook bb ON p.bankbook_id=bb.bankbook_id
                   LEFT JOIN period per ON b.per_id=per.per_id
                   LEFT JOIN series ser ON b.ser_id=ser.ser_id";

        $where_str = "";
        $where_arr = array();

        if( !empty($options["start"]) && !empty($options["end"]) ){
            $where_str .= !empty($where_str) ? " AND " : "";
            $where_str .= "(pay_date BETWEEN :s AND :e)";
            $where_arr[":s"] = $options["start"];
            $where_arr[":e"] = $options["end"];
        }
        if( !empty($options["country"]) ){
            $where_str .= !empty($where_str) ? " AND " : "";
            $where_str .= "ser.country_id=:country";
            $where_arr[":country"] = $options["country"];
        }
        if( !empty($options["series"]) ){
            $where_str .= !empty($where_str) ? " AND "  :"";
            $where_str .= "ser.ser_id=:series";
            $where_arr[":series"] = $options["series"];
        }
        if( !empty($options["bankbook"]) ){
            $where_str .= !empty($where_str) ? " AND " : "";
            $where_str .= "p.bankbook_id=:bankbook";
            $where_arr[":bankbook"] = $options["bankbook"];
        }

        if( !empty($where_str) ) $where_str = "WHERE {$where_str}";
        $results = $this->db->select("SELECT {$_field} FROM {$_table} {$where_str}", $where_arr);
        foreach ($results as $key => $value) {
            $value = $this->_cutFirstFieldName("pay_", $value);
            $action = "";

            if( !empty($value["user_action"]) ){
                if( $this->query("payment")->getUser( $value["user_action"] ) ){
                    $action = $this->query("payment")->getUser( $value["user_action"] );
                }
                elseif( $this->query("payment")->getAgency( $value["user_action"] ) ){
                    $action = $this->query("payment")->getAgency( $value["user_action"] );
                }
                else{
                    $action = $this->query("payment")->getAgencyCompany( $value["user_action"] );
                }
            }

            $value["action"] = $action;
            $value["book_status_arr"] = $this->query("booking")->getStatus( $value["book_status"] );

            if( $value["book_status"] == 20 ){
                $data["total_dep_pt"] += $value["received"];
            }
            if( $value["book_status"] == 25 ){
                $data["total_dep"] += $value["received"];
            }
            if( $value["book_status"] == 30 ){
                $data["total_full_pt"] += $value["received"];
            }
            if( $value["book_status"] == 35 ){
                $data["total_full"] += $value["received"];
            }

            $data["lists"][] = $value;
            $data["total_receipt"] += $value["received"];
            $data["total"]++;

            if( empty($data["bankbook"][$value["bankbook_id"]]) ){
                $data["bankbook"][$value["bankbook_id"]] = 0;
            }
            $data["bankbook"][$value["bankbook_id"]] += $value["received"];
        }

        return $data;
    }

    public function listsPeriodMonthy( $options=array() ){
        $data = array();
        $data['total_qty'] = 0;
        $data['total_receipt'] = 0;
        $data['total_master'] = 0;
        $data['total_balance'] = 0;
        $data['total'] = 0;

        $data['total_cancel'] = 0;
        $data['total_master_cancel'] = 0;
        $data['total_qty_cancel'] = 0;

        $field = "b.book_date
                  , b.book_code
                  , b.book_master_deposit
                  , b.book_master_full_payment
                  , b.book_receipt
                  , b.status

                  , ser.ser_name
                  , ser.ser_code

                  , (SELECT COALESCE(SUM(booking_list.book_list_qty),0) FROM booking_list WHERE booking_list.book_code=b.book_code AND booking_list.book_list_code IN ('1','2','3') ) as qty

                  , agen.agen_fname
                  , agen.agen_lname
                  , agen.agen_nickname

                  , ac.agen_com_name

                  , s.user_fname
                  , s.user_lname
                  , s.user_nickname

                  , per.per_date_start
                  , per.per_date_end";
        $table = "booking b 
                  LEFT JOIN period per ON b.per_id=per.per_id
                  LEFT JOIN series ser ON b.ser_id=ser.ser_id
                  LEFT JOIN agency agen ON b.agen_id=agen.agen_id
                  LEFT JOIN agency_company ac ON agen.agency_company_id=ac.agen_com_id
                  LEFT JOIN user s ON b.user_id=s.user_id";

        $where_str = '';
        $where_arr = array();

        if( !empty($options["start"]) && !empty($options["end"]) ){
            $where_str .= !empty($where_str) ? " AND " : "";
            $where_str .= "(per.per_date_start BETWEEN :s AND :e)";
            $where_arr[":s"] = $options["start"];
            $where_arr[":e"] = $options["end"];
        }
        if( !empty($options["country"]) ){
            $where_str .= !empty($where_str) ? " AND " : "";
            $where_str .= "ser.country_id=:country";
            $where_arr[":country"] = $options["country"];
        }
        if( !empty($options["series"]) ){
            $where_str .= !empty($where_str) ? " AND " : "";
            $where_str .= "ser.ser_id=:series";
            $where_arr[":series"] = $options["series"];
        }
        if( !empty($options["sale"]) ){
            $where_str .= !empty($where_str) ? " AND " : "";
            $where_str .= "b.user_id=:sale";
            $where_arr[":sale"] = $options["sale"];
        }
        if( !empty($options["company"]) ){
            $where_str .= !empty($where_str) ? " AND " : "";
            $where_str .= "agen.agency_company_id=:company";
            $where_arr[":company"] = $options["company"];
        }
        if( !empty($options["agency"]) ){
            $where_str .= !empty($where_str) ? " AND " : "";
            $where_str .= "b.agen_id=:agency";
            $where_arr[":agency"] = $options["agency"];
        }
        if( $options["status"] != null ){

            $status = '';
            foreach ($options["status"] as $key => $value) {
                $status .= !empty($status) ? " OR " : "";
                $status .= "b.status={$value}";
            }
            if( !empty($status) ){
                $where_str .= !empty($where_str) ? " AND " : "";
                $where_str .= "({$status})";
            }
        }

        $where_str = !empty($where_str) ? "WHERE {$where_str}" : "";
        $results = $this->db->select("SELECT {$field} FROM {$table} {$where_str} ORDER BY per.per_date_start ASC", $where_arr);
        foreach ($results as $key => $value) {
            $data['lists'][$key] = $value;
            $data['lists'][$key]['book_master'] = $value["book_master_deposit"] + $value["book_master_full_payment"];
            $data['lists'][$key]['book_balance'] = $data['lists'][$key]['book_master'] - $value["book_receipt"];
            $data['lists'][$key]['status_arr'] = $this->query('booking')->getStatus($value["status"]);

            $data['total_qty'] += $value["qty"];
            $data['total_receipt'] += $value["book_receipt"];
            $data['total_master'] += $data['lists'][$key]['book_master'];
            $data['total_balance'] += $data['lists'][$key]['book_balance'];

            if( $value["status"] == 40 ){
                $data['total_master_cancel'] += $data['lists'][$key]['book_master'];
                $data['total_qty_cancel'] += $value["qty"];
                $data['total_cancel']++;
            }

            $data['total']++;
        }

        $data['options'] = $options;
        return $data;
    }
    public function listsMonitor( $options=array() ){
        $data = array();
        $data["total_seat"] = 0;
        $data["total_payment"] = 0;

        $field = "per.per_id
                  , per.per_date_start
                  , per.per_date_end

                  , ser.ser_code
                  , ser.ser_name

                  , bus.bus_qty
                  , bus.bus_no";
        $table = "period per 
                  LEFT JOIN series ser ON per.ser_id=ser.ser_id
                  LEFT JOIN bus_list bus ON bus.per_id=per.per_id";

        $where_str = '';
        $where_arr = array();

        if( !empty($options["start"]) && !empty($options["end"]) ){
            $where_str .= !empty($where_str) ? " AND " : "";
            $where_str .= "(per.per_date_start BETWEEN :s AND :e)";
            $where_arr[":s"] = $options["start"];
            $where_arr[":e"] = $options["end"];
        }
        if( !empty($options["country"]) ){
            $where_str .= !empty($where_str) ? " AND " : "";
            $where_str .= "ser.country_id=:country";
            $where_arr[":country"] = $options["country"];
        }
         if( !empty($options["series"]) ){
            $where_str .= !empty($where_str) ? " AND " : "";
            $where_str .= "per.ser_id=:series";
            $where_arr[":series"] = $options["series"];
        } 
        if( !empty($options["status"]) ){

            $status = '';
            foreach ($options["status"] as $key => $value) {
                $status .= !empty($status) ? "," : "";
                $status .= $value;
            }
            if( !empty($status) ){
                $where_str .= !empty($where_str) ? " AND " : "";
                $where_str .= "per.status IN ({$status})";
            }
        }
        $where_str = !empty($where_str) ? "WHERE {$where_str}" : "";
        $results = $this->db->select( "SELECT {$field} FROM {$table} {$where_str} GROUP BY bus.bus_id ORDER BY per.per_date_start ASC", $where_arr );
        $data["total"] = count($results);
        $data["lists"] = array();
        foreach ($results as $key => $value) {
            $data["lists"][$key] = $value;

            /* SET book_qty */
            $sth = $this->db->prepare("
                SELECT 
                COALESCE(SUM(booking_list.book_list_qty),0) as qty
                FROM booking_list LEFT JOIN booking ON booking.book_code=booking_list.book_code 
                WHERE booking.per_id=:id AND booking.bus_no=:bus AND booking_list.book_list_code IN ('1','2','3') AND booking.status != 40");
            $sth->execute( array( ':id'=> $value["per_id"], ':bus'=>$value["bus_no"]) );
            $sthData = $sth->fetch( PDO::FETCH_ASSOC );

            $data["lists"][$key]["book_qty"] = $sthData["qty"];
            $data["total_payment"] += $sthData["qty"];

            /* SET Payment */
            $payment = $this->db->select("SELECT pay_date, pay_received 
                                          FROM payment LEFT JOIN booking ON payment.book_id=booking.book_id 
                                          WHERE booking.per_id='{$value["per_id"]}' AND booking.bus_no='{$value["bus_no"]}' AND payment.status=1");
            foreach ($payment as $pay) {
                $month = date("Y-n", strtotime($value["per_date_start"]));
                if( empty($data["lists"][$key][$month]["total"]) ){
                    $data["lists"][$key][$month]["total"] = 0;
                }
                $data["lists"][$key][$month]["total"] += $pay["pay_received"];
            }
            $data["total_seat"] += $value["bus_qty"];
        }

        $data["options"] = $options;
        return $data;
    }

    /* REPORT FOR FRONTEND */
    public function accounting( $options=array() ){
        $field = "b.book_id
                  , b.book_code
                  , b.status
                  , b.book_due_date_deposit
                  , b.book_due_date_full_payment

                  , a.agen_fname
                  , a.agen_lname
                  , a.agen_nickname

                  , u.user_fname
                  , u.user_lname
                  , u.user_nickname

                  , COALESCE(SUM(book_list_qty),0) AS qty

                  , ac.agen_com_name

                  , p.per_date_start
                  , p.per_date_end

                  , s.ser_code

                  , b.book_amountgrandtotal";
        $table = "booking b 
                    LEFT JOIN booking_list bl ON b.book_code=bl.book_code
                    LEFT JOIN agency a ON b.agen_id=a.agen_id
                    LEFT JOIN user u ON b.user_id=u.user_id
                    LEFT JOIN agency_company ac ON a.agency_company_id=ac.agen_com_id
                    LEFT JOIN period p ON b.per_id=p.per_id
                    LEFT JOIN series s ON b.ser_id=s.ser_id";

        $data = array();
        $where_str = '';
        $where_arr = array();

        if( !empty($options["expired"]) ){
            $where_str .= !empty($where_str) ? " AND " : "";
            $where_str .= "((b.status IN (0,20,55) AND book_due_date_deposit <= :date) 
                           OR (b.status IN (25,30,55) AND book_due_date_full_payment <= :date))";
            $where_arr[":date"] = date("Y-m-d");
        }

        if( !empty($options["start"]) && !empty($options["end"]) ){
            $where_str .= !empty($where_str) ? " AND " : "";
            $where_str .= "((b.status IN (0,20,55) AND (book_due_date_deposit BETWEEN :s AND :e)) 
                           OR (b.status IN (0,25,30,55) AND (book_due_date_full_payment BETWEEN :s AND :e)))";
            $where_arr[":s"] = $options["start"];
            $where_arr[":e"] = $options["end"];
        }

        if( !empty($options["company"]) ){
            $where_str .= !empty($where_str) ? " AND " : "";
            $where_str .= "ac.agen_com_id=:company";
            $where_arr[":company"] = $options["company"];
        }

        $where_str .= !empty($where_str) ? " AND " : "";
        $where_str .= "bl.book_list_code IN (1,2,3)";

        $where_str = !empty($where_str) ? "WHERE {$where_str}" : "";
        $sql = "SELECT {$field} FROM {$table} {$where_str} GROUP BY b.book_id";
        // print_r($where_arr);die;
        $results = $this->db->select( $sql , $where_arr);

        foreach ($results as $key => $value) {
            $data[$key] = $value;
            $data[$key]['status_arr'] = $this->query("booking")->getStatus( $value["status"] );
        }
        return $data;
    }

    public function listsTeamSale( $options=array() ){
        $data = array();

        /* SET VARIBLE FOR TOTAL */
        $data['total'] = 0;
        $data['seat'] = 0;

        /* CONDITION FOR SALE LIST */
        $w = "(user_team_id != 0)";
        $w_arr = array();

        if( !empty($options["team"]) ){
            $w .= !empty($w) ? " AND " : "";
            $w .= "user_team_id=:team";
            $w_arr[":team"] = $options["team"];
        }
        if( !empty($options["sale"]) ){
            $w .= !empty($w) ? " AND " : "";
            $w .= "user_id=:sale";
            $w_arr[":sale"] = $options["sale"];
        }
        $w = !empty($w) ? "WHERE {$w}" : "";
        $sale = $this->db->select("SELECT u.*, t.team_name FROM user u LEFT JOIN teams t ON u.user_team_id=t.team_id {$w}", $w_arr);

        /* CONDITION FOR REPORT */
        $field = "per.per_id
                  , per.per_date_start
                  , per.per_date_end

                  , bus.bus_qty
                  , bus.bus_no

                  , COALESCE(SUM(blist.book_list_qty),0) AS book_qty

                  , COALESCE(SUM(pay.pay_received),0) AS pay_total";
        $table = "period per 
                  LEFT JOIN series ser ON per.ser_id=ser.ser_id
                  LEFT JOIN bus_list bus ON bus.per_id=per.per_id
                  LEFT JOIN booking book ON per.per_id=book.per_id
                  LEFT JOIN booking_list blist ON book.book_code=blist.book_code
                  LEFT JOIN payment pay ON book.book_id=pay.book_id";

        foreach ($sale as $key => $value) {
            /* TOTAL BALANCE */
            $data["lists"][$key] = $value;

            /* TOTAL SEATS */
            $data["seats"][$key] = $value;

            $data['total_sale'][$value["user_id"]] = 0;
            $data['total_seat'][$value["user_id"]] = 0;
            if( empty($data['total_team'][$value["user_team_id"]]) ){
                $data['total_team'][$value["user_team_id"]] = 0;
            }
            if( empty($data['total_book'][$value["user_team_id"]]) ){
                $data['total_book'][$value["user_team_id"]] = 0;
            }

            $where_str = '';
            $where_arr = array();
            if( !empty($options["start"]) && !empty($options["end"]) ){
                $where_str .= !empty($where_str) ? " AND " : "";
                $where_str .= "(per.per_date_start BETWEEN :s AND :e)";
                $where_arr[":s"] = $options["start"];
                $where_arr[":e"] = $options["end"];
            }
            if( !empty($options["country"]) ){
                $where_str .= !empty($where_str) ? " AND " : "";
                $where_str .= "ser.country_id=:country";
                $where_arr[":country"] = $options["country"];
            }

            $where_str .= !empty($where_str) ? " AND " : "";
            $where_str .= "book.status != 40 AND book.user_id=:sale AND blist.book_list_code IN (1,2,3) AND pay.status=1";
            $where_arr[":sale"] = $value["user_id"];

            $where_str = !empty($where_str) ? "WHERE {$where_str}" : "";
            $results = $this->db->select( "SELECT {$field} FROM {$table} {$where_str} GROUP BY book.user_id, book.per_id ORDER BY per.per_date_start,per.per_date_end ASC", $where_arr );
            foreach ($results as $i => $val) {
                $month = date("m", strtotime($val["per_date_start"]));

                if( empty($data["lists"][$key][$month]) ){
                    $data["lists"][$key][$month] = 0;
                }
                if( empty($data['seats'][$key][$month]) ){
                    $data['seats'][$key][$month] = 0;
                }
                $data["lists"][$key][$month] += $val["pay_total"];
                $data['seats'][$key][$month] += $val["book_qty"];

                /* SET TOTAL FOR SALE */
                $data['total_sale'][$value["user_id"]] += $val['pay_total'];
                $data['total_team'][$value["user_team_id"]] += $val['pay_total'];

                if( empty($data["total_month"][$month]) ){
                    $data["total_month"][$month] = 0;
                }
                if( empty($data['total_month_seat'][$month]) ){
                    $data['total_month_seat'][$month] = 0;
                }
                $data["total_month"][$month] += $val["pay_total"];
                $data['total_month_seat'][$month] += $val["book_qty"];
                $data['total'] += $val['pay_total'];
                $data['seat'] += $val["book_qty"];

                $data['total_seat'][$value["user_id"]] += $val['book_qty'];
                $data['total_book'][$value["user_team_id"]] += $val["book_qty"];
            }
        }
        return $data;
    }

    /* LIST FOR JSON */
    public function listsSeries( $country_id=null ){
        $w = 'status IN (1,9)';
        $w_arr = array();

        if( !empty($country_id) ){
            $w .= !empty($w) ? " AND " : "";
            $w .= "country_id=:country";
            $w_arr[":country"] = $country_id;
        }

        $w = !empty($w) ? "WHERE {$w}" : "";

        return $this->db->select("SELECT ser_id AS id , ser_name AS name , ser_code AS code FROM series {$w} ORDER BY ser_code ASC", $w_arr);
    }
    public function listsAgency($com_id){
        return $this->db->select("SELECT agen_id AS id, agen_fname AS fname, agen_lname AS lname, agen_nickname AS nickname FROM agency WHERE agency_company_id={$com_id}");
    }
    public function listsSaleTeam($team_id){
        return $this->db->select("SELECT user_id AS id, user_fname AS fname, user_lname AS lname, user_nickname AS nickname FROM user WHERE user_team_id=:team AND status=1 AND group_id IN (3,5,7)", array(":team"=>$team_id));
    }
}