<?php
$sex[] = array('id'=>1, 'name'=>'M');
$sex[] = array('id'=>2, 'name'=>'F');

$room[] = array('key'=>'book_room_twin', 'text'=>'Twin', 'count'=>2, 'cls'=>'bg-primary-dark');
$room[] = array('key'=>'book_room_double', 'text'=>'Double', 'count'=>2, 'cls'=>'bg-success-dark');
$room[] = array('key'=>'book_room_triple', 'text'=>'Triple', 'count'=>3, 'cls'=>'bg-info-dark');
$room[] = array('key'=>'book_room_single', 'text'=>'Single', 'count'=>1, 'cls'=>'bg-warning-dark');

$data = array();

if( !empty($this->item["pessenger"]) ){
	foreach ($this->item["pessenger"] as $key => $value) {
		$data[$value["room_type"]][] = $value;
		
	}
	
}

?>
<style type="text/css">
.inputtext{
	width: 140px;
	/*display: block;
	width: 140px;
	height: 35px;
	padding: 6px 16px;
	font-size: 14px;
	line-height: 1.52857143;
	color: #3a3f51;
	background-color: #fff;
	background-image: none;
	border: 1px solid #dde6e9;
	border-radius: 4px;*/
}
.uiPopover{
	width:252.3px;
}
select.inputtext.sex{
	width: 70px;
}
input.inputtext.prename{
	width: 70px;
}
</style>
<div class="clearfix">
	<div class="uiBoxWhite pas pam">
		<ul class="mbs mbm">
			<li>
				<h3>รหัสการจอง : <?=$this->item["book_code"]?></h3>
			</li>
			<li>
				<h3>ชื่อลูกค้า : <?=$this->item["book_cus_name"]?></h3>
			</li>
			<li>
				<h3>เบอร์โทรลูกค้า : <?=$this->item["book_cus_tel"]?></h3>
			</li>
			<li class="mts">
				<span class="gbtn">
					<a href="<?=URL?>booking/passport/<?=$this->item["book_id"]?>" data-plugins="dialog" class="btn btn-blue"><i class="icon-upload mrs"></i>อัพโหลดพาสปอร์ต</a>
				</span>
			</li>
		</ul>
		<form class="js-submit-form" action="<?=URL?>booking/setPessenger/<?=$this->item["book_id"]?>">
			<?php foreach ($room as $key => $value) { 
				if( empty($this->item[$value["key"]]) ) continue;
	
				?>
				<div class="uiBoxOverlay pas mtl">
					<span class="fwb"><?= $value["text"] ?> <?=$this->item[$value["key"]]?></span>
					<table class="table-bordered table-responsive">
						<thead>
							<tr class="<?=$value["cls"]?>">
								<th width="5%">No.</th>
								<th width="5%">Room</th>
								<th width="5%">Title*</th>
								<th width="5%">Firstname*</th>
								<th width="5%">Lastname*</th>
								<th width="5%">Fullname THAI*</th>
								<th width="5%">Sex*</th>
								<th width="5%">Country*</th>
								<th width="5%">Nationality*</th>
								<th width="5%">Address in Thailand*</th>
								<th width="5%">Birthday*</th>
								<th width="5%">Passport No.*</th>
								<th width="5%">Expire*</th>
								<th width="5%">อาชีพ</th>
								<th width="5%">จัดหวัดที่เกิด</th>
								<th width="5%">สถานที่ออก pp</th>
								<th width="5%">วันที่ออก pp</th>
								<th>
									<table>
										<thead>
											<tr><span class="tac">Food</span></tr>
										<thead>
										<tbody>
											<tr>
												<td class="tac">No Seafood</td>
												<td>No Chicken</td>
                                                <td>No Pork</td>
												<td>No Beef</td>
												<td>Vegetarian</td>
											</tr>
										</tbody>
									</table>
								</th>
								<th>
								<table>
										<thead>
											<tr><span class="tac">Seat</span></tr>
                                            <tr>
												<td style="padding:8px 15px 8px 15px">BC.</td>
												<td style="padding:10px 15px 10px 15px;">HS.</td>
											</tr>
										</thead>
									</table>
								</th>
								<th>
									<table>
										<thead>
										<tr>
											<span>Bagges</span>
										</tr>
										</thead>
										<tbody>
										<tr>
											<td>ขาไป <br>(kg)</td>
											<td>ขากลับ <br>(kg)</td>
										</tr>
										</tbody>	
									</table>
								</th>
								<th>
									<table>
									<tr><span>Other</span></tr>
									<thead>
									 <tr>
									 <th>Wifi</th>
									 <th>Sim</th>
									 <th class="tac" width="100px;">Ticket</th>
									 <th style="height:40px;" class="tac" width="300px;">Remark</th>
									 </tr>
									</thead>
									</table>
								</th>
							</tr>
						</thead>
						<tbody>
							<?php
							
							$count = $value["count"] * $this->item[$value["key"]]; 
							
							$type = strtolower($value["text"]);
						
							$n=0;
							for($i=1;$i<=$count;$i++){ 
								?>
								<tr>
									<td class="tac"><span class="mrs mls"><?=$i?>.</span></td>
									<td>
										</select>
										<select class="inputtext" name="pess[room_no][]">
											<?php 
											for($j=1; $j<=$this->item[$value["key"]]; $j++){
												$sel = '';
												if( !empty($data[$type][$n]) ){
													if( $data[$type][$n]["room_no"] == $j ) $sel = ' selected="1"';
												}
												echo '<option'.$sel.' value="'.$j.'">'.$value["text"].'-'.$j.'</option>';
											}
											?>
										</select>
										<input type="hidden" name="pess[room_type][]" value="<?=$type?>">
									</td>
									<td>
										<input type="text" class="inputtext prename" name="pess[title][]" value="<?= !empty($data[$type][$n]) ? $data[$type][$n]["title"] : "" ?>">
									</td>
									<td>
										<input type="text" class="inputtext" name="pess[fname][]" value="<?= !empty($data[$type][$n]) ? $data[$type][$n]["fname"] : "" ?>">
									</td>
									<td>
										<input type="text" class="inputtext" name="pess[lname][]" value="<?= !empty($data[$type][$n]) ? $data[$type][$n]["lname"] : "" ?>">
									</td>
									<td>
										<input type="text" class="inputtext" name="pess[name_thai][]" value="<?= !empty($data[$type][$n]) ? $data[$type][$n]["name_thai"] : "" ?>">
									</td>
									<td>
										<select class="inputtext sex" name="pess[sex][]">
											<?php 
											foreach ($sex as $_sex) {
												$sel = "";
												if( !empty($data[$type][$n]) ){
													if( $data[$type][$n]["sex"] == $_sex["id"] ) $sel = ' selected="1"';
												}
												echo '<option'.$sel.' value="'.$_sex["id"].'">'.$_sex["name"].'</option>';
											}
											?>
										</select>
									</td>
									<td>
										<input type="text" class="inputtext" name="pess[country][]" value="<?= !empty($data[$type][$n]) ? $data[$type][$n]["country"] : "" ?>">
									</td>
									<td>
										<input type="text" class="inputtext" name="pess[nationality][]" value="<?= !empty($data[$type][$n]) ? $data[$type][$n]["nationality"] : "" ?>">
									</td>
									<td>
										<input type="text" class="inputtext" name="pess[address][]" value="<?= !empty($data[$type][$n]) ? $data[$type][$n]["address"] : "" ?>">
									</td>
									<td>
										<input style="width:252px;" type="date" class="inputtext" data-plugins="datepicker" name="pess[birthday][]" value="<?= !empty($data[$type][$n]) ? date("Y-m-d", strtotime($data[$type][$n]["birthday"])) : "" ?>">
									</td>
									<td>
										<input type="text" class="inputtext" name="pess[passportno][]" value="<?= !empty($data[$type][$n]) ? $data[$type][$n]["passportno"] : "" ?>">
									</td>
									<td>
										<input type="date" class="inputtext" data-plugins="datepicker" name="pess[expire][]" value="<?= !empty($data[$type][$n]) ? date("Y-m-d", strtotime($data[$type][$n]["expire"])) : "" ?>">
									</td>
								
									<td>
										<input type="text" class="inputtext" name="pess[career][]" value="<?= !empty($data[$type][$n]) ? $data[$type][$n]["career"] : "" ?>">
									</td>
									<td>
										<input type="text" class="inputtext" name="pess[pob][]" value="<?= !empty($data[$type][$n]) ? $data[$type][$n]["pob"] : "" ?>">
									</td>
									<td>
										<input type="text" class="inputtext" name="pess[popp][]" value="<?= !empty($data[$type][$n]) ? $data[$type][$n]["popp"] : "" ?>">
									</td>
									<td>
										<input style="width:252.3px;" type="date" class="inputtext" data-plugins="datepicker" name="pess[date_pp][]" value="<?= !empty($data[$type][$n]) ? date("Y-m-d", strtotime($data[$type][$n]["date_pp"])) : "" ?>">
									</td>
									<td>
                                    <table>
						
										<tbody>
											<tr>
												<td><label style="padding:0 15px 0 28px;" class="checkbox"><input value="1" <?= !empty($data[$type][$n]['no_sf'])=='1' ? "checked" : "";?>  type="checkbox" name="pess[no_sf][]"/></label></td></label>
												<td><label style="padding:0 10px 0 29px;" class="checkbox"><input value="1" <?= !empty($data[$type][$n]['no_ck'])=='1' ? "checked" : "";?>  type="checkbox" name="pess[no_ck][]"/></label></td></label>
												<td><label style="padding:0 5px 0 10px;" class="checkbox"><input value="1" <?= !empty($data[$type][$n]['no_pk'])=='1' ? "checked" : "";?>   type="checkbox"  name="pess[no_pk][]"/></label></td></label>
                                                <td><label style="padding:0 0px 0 20px;" class="checkbox"><input value="1"  <?= !empty($data[$type][$n]['no_bf'])=='1' ? "checked" : "";?>  type="checkbox" name="pess[no_bf][]"/></label></td></label>
                                                <td><label style="padding:0 25px 0 31px;" class="checkbox"><input value="1" <?= !empty($data[$type][$n]['vet'])=='1' ? "checked" : "";?>  type="checkbox" name="pess[vet][]"/></label></td></label>
											</tr>
										</tbody>
									</table>
									</td>
                                    <td>
                                    <table>
										<tbody>
											<tr>
												<td> <input style="width:72px; height:32px;" type="text" name="pess[bc][]" value="<?=!empty($data[$type][$n]['bc'])? $data[$type][$n]['bc'] : ''?>"/></td>
												<td><input style="width:32px; height:32px;</width:32>px;" type="text" name="pess[hs][]" value="<?=!empty($data[$type][$n]['hs']) ? $data[$type][$n]['hs'] : ''?>"/></td>
										</tbody>
									</table>
                                    </td>
                                    <td>
                                    <table>
										<tbody>
											<tr>
												<td><input style="width:40px; height:32px;"  type="number" name="pess[bagges_departure][]" value="<?=!empty($data[$type][$n]['bagges_departure']) ? $data[$type][$n]['bagges_departure'] : '' ?>"/></td>
												<td><input style="width:50px; height:32px;"  type="number" name="pess[bagges_return][]" value="<?=!empty($data[$type][$n]['bagges_return']) ? $data[$type][$n]['bagges_return']  : '' ?>"/></td>
											</tr>
										</tbody>
									</table>
                                    </td>
                                    <td>
                                    <table>
										<tbody>
											<tr>
												<td><label style="padding:0 4px 0 5px;" class="checkbox"><input value="1" <?=!empty($data[$type][$n]['wifi'])? 'checked' : ''?> type="checkbox"  name="pess[wifi][]"  /></td>
												<td><label style="padding:0 5px 0 2px;" class="checkbox"><input value="1" <?=!empty($data[$type][$n]['sim'])? 'checked':'' ?> type="checkbox" name="pess[sim][]"  /></td>
                                                <td><input style="width:100px;" type="text" name="pess[disney][]" value="<?=!empty($data[$type][$n]['disney'])? $data[$type][$n]['disney'] : ''?>" /></td>
												<td><input style="width:290px;" type="text" name="pess[other][]" value="<?=!empty($data[$type][$n]['other'])? $data[$type][$n]['other']: '' ?>" /></td>
											</tr>
										</tbody>
									</table>
                                    </td>
								</tr>
								<?php 
								$n++;
							} ?>
						</tbody>
					</table>
				</div>
				<?php 
			} ?>
			<div class="clearfix mtl tac">
				<span class="gbtn">
					<button class="btn btn-submit btn-blue"><i class="icon-save mrs"></i>บันทึก</button>
				</span>
			</div>
			<input type="hidden" name="book_code" value="<?=$this->item["book_code"]?>">
		</form>
	</div>
</div>