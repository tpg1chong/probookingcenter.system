<?php

class System_Model extends Model{

    public function __construct() {
        parent::__construct();
    }

    /**/
    /* permit */
    /**/
    public function permit( $access=array() ) {

        $permit = array('view'=>0,'edit'=>0, 'del'=>0, 'add'=>0);

        // Settings
        $arr = array( 
            'notifications' => array('view'=>1),
            'calendar' => array('view'=>1),

            'my' => array('view'=>1,'edit'=>1),

        );

        // is admin 
        if( in_array(1, $access) ){ 

            // set settings
            // $arr['company'] = array('view'=>1,'edit'=>1, 'del'=>1, 'add'=>1);
            $arr['admin_roles'] = array('view'=>1,'edit'=>1, 'del'=>1, 'add'=>1);  
            
            $arr['site_manage'] = array('view'=>1,'edit'=>1, 'del'=>1, 'add'=>1);
            $arr['site_design'] = array('view'=>1,'edit'=>1, 'del'=>1, 'add'=>1);

            // blog
            $arr['forum'] = array('view'=>1,'edit'=>1, 'del'=>1, 'add'=>1);
            $arr['category'] = array('view'=>1,'edit'=>1, 'del'=>1, 'add'=>1);
            $arr['topic'] = array('view'=>1,'edit'=>1, 'del'=>1, 'add'=>1);
            
            $arr['plan'] = array('view'=>1,'edit'=>1, 'del'=>1, 'add'=>1);
            $arr['banner'] = array('view'=>1,'edit'=>1, 'del'=>1, 'add'=>1);
            $arr['agency'] = array('view'=>1,'edit'=>1, 'del'=>1, 'add'=>1);
            $arr['site_location'] = array('view'=>1,'edit'=>1, 'del'=>1, 'add'=>1);
            
            $arr['ebook'] = array('view'=>1,'edit'=>1, 'del'=>1, 'add'=>1);
            $arr['inbox'] = array('view'=>1,'edit'=>1, 'del'=>1, 'add'=>1);
        }

        /* Manage */
        if( in_array(2, $access) ){

        }

        return $arr;
    }


    public function set($name, $value) {
        $sth = $this->db->prepare("SELECT option_name as name FROM system_info WHERE option_name=:name LIMIT 1");
        $sth->execute( array(
            ':name' => $name
        ) );

        if( $sth->rowCount()==1 ){
            $fdata = $sth->fetch( PDO::FETCH_ASSOC );

            if( !empty($value) ){
                $this->db->update('system_info', array(
                    'option_name' => $name,
                    'option_value' => $value
                ), "`option_name`='{$fdata['name']}'");
            }
            else{
                $this->db->delete('system_info', "`option_name`='{$fdata['name']}'");
            }
        }
        else{

            if( !empty($value) ){
                $this->db->insert('system_info', array(
                    'option_name' => $name,
                    'option_value' => $value
                ));
            }
            
        }
    }

    public function get() {
        $data = $this->db->select( "SELECT * FROM system_info" );

        $object = array();
        foreach ($data as $key => $value) {
            $object[$value['option_name']] = $value['option_value'];
        }

        $contacts = $this->db->select( "SELECT contact_type as type, contact_name as name, contact_value as value FROM system_contacts" );


        $_contacts = array();
        foreach ($contacts as $key => $value) {
            $_contacts[ $value['type'] ][] = $value; 
        }

        $object['contacts'] = $_contacts;
        $object['navigation'] = $this->navigation();


        if( !empty($object['location_city']) ){
            
            $city_name = $this->getCityName( $object['location_city'] );
        }


        if( !empty($object['working_time_desc']) ){
            $object['working_time_desc'] = json_decode($object['working_time_desc'], true);
        }

        return $object;
    }

    public function setContacts($data) {
        
        $this->db->select("TRUNCATE TABLE system_contacts");

        foreach ($data as $key => $value) {

            $this->db->insert('system_contacts', array(
                'contact_type' => $value['type'],
                'contact_name' => $value['name'],
                'contact_value' => $value['value'],
            ));
        }
    }
    public function getCityName($id) {
        $sth = $this->db->prepare("SELECT city_name as name FROM city WHERE city_id=:id LIMIT 1");
        $sth->execute( array(
            ':id' => $id
        ) );

        
        $fdata = $sth->fetch( PDO::FETCH_ASSOC );
        return $fdata['name'];
    }

    public function navigation() {
        
        $nav = array();

        $nav = array();
        $nav[] = array('id'=>'index', 'name' => 'Home', 'url' => URL);
        $nav[] = array('id'=>'tour', 'name' => 'PROGRAM TOUR', 'url' => URL.'tour');
        $nav[] = array('id'=>'partner', 'name' => 'PARTNER', 'url' => URL.'partner');
        $nav[] = array('id'=>'about-us', 'name' => 'ABOUT US', 'url' => URL.'about');
        $nav[] = array('id'=>'contact-us', 'name' => 'CONTACT US', 'url' => URL.'contact');

        return $nav;
    }
    

    public function city() {
        return $this->db->select("SELECT city_id as id, city_name as name FROM city ORDER BY city_name ASC");
    }
    public function city_name($id) {
        $sth = $this->db->prepare("SELECT city_name as name FROM city WHERE city_id=:id LIMIT 1");
        $sth->execute( array( ':id' => $id ) );

        $text = '';
        if( $sth->rowCount()==1 ){
            $fdata = $sth->fetch( PDO::FETCH_ASSOC );
            $text = $fdata['name'];
        }

        return $text;
    }

    /**/
    /* GET PAGE PERMISSION */
    /**/
    public function getPage($id) {

        $id = '';
        foreach ($this->pageMenu as $key => $value) {
            if( $id==$value['id'] ){
                 $id = $value['id'];
                break;
            }
        }

        return $id;
    }


    /**/
    /* Prefix Name */
    /**/
    public function prefixName( $options=array() ){

        $a['Mr.'] = array('id'=>'Mr.', 'name'=> $this->lang->translate('Mr.') );
        $a['Mrs.'] = array('id'=>'Mrs.', 'name'=> $this->lang->translate('Mrs.') );
        $a['Ms.'] = array('id'=>'Ms.', 'name'=> $this->lang->translate('Ms.') );

        return array_merge($a, $options);
    }
    public function getPrefixName($name) {
       
       $prefix = $this->prefixName();
       foreach ($prefix as $key => $value) {
            if( $value['id'] == $name ){
                $name = $value['name'];
                break;
            }
       }
       return $name;
    }


    public function isPrimarylink($keyword)
    {
        $is = false;
        $nav = $this->navigation();


        foreach ($nav as $value) {

            if( $value['name']==$keyword || $value['id']==$keyword ){
                $is = true; break;
            }

            if( !empty($value['items']) && !$is ){

                foreach ($value['items'] as $item) {
                    
                    if( $item['primarylink']==$keyword ){
                        $is = true; break;
                    }
                    
                }
            }
        }

        // check post
        if( !$is ){
            $count = $this->db->count("topic", "`topic_primarylink`=:id", array(':id'=>$keyword));
            $is = $count>=1 ? true: false;
        }

        return $is;
    }

    public function geo(){
        return $this->db->select("SELECT GEO_ID AS id, GEO_NAME AS name FROM geography ORDER BY GEO_NAME ASC");
    }
    public function province(){
        return $this->db->select("SELECT PROVINCE_ID AS id, PROVINCE_NAME AS name FROM province");
    }
    public function getGeoProvince( $geo_id ){
        return $this->db->select("SELECT PROVINCE_ID AS id, PROVINCE_NAME AS name FROM province WHERE GEO_ID={$geo_id} ORDER BY PROVINCE_NAME ASC");
    }
    public function district(){
        return $this->db->select("SELECT AMPHUR_ID AS id, AMPHUR_NAME AS name FROM amphur");
    }
    public function getProvinceAmphur( $province_id ){
        return $this->db->select("SELECT AMPHUR_ID AS id, AMPHUR_NAME AS name FROM amphur WHERE PROVINCE_ID={$province_id} ORDER BY AMPHUR_NAME ASC");
    }
}