<?php

$form = new Form();
$form = $form->create()
		->url(URL."me/updated/account?run=1")
		->addClass('js-submit-form form-insert')
		->method('post');

$form   ->field("user_name")
        ->label($this->lang->translate('Username'))
        ->addClass('inputtext')
        ->autocomplete("off")
        ->value( !empty($this->me['login']) ? $this->me['login']:''  );

// $form   ->field("user_lang")
//         ->label($this->lang->translate('Language'))
//         ->addClass('inputtext')
//         ->select( array(0=>
//               array('id'=>'th','name'=>'ภาษาไทย - Thai')
//             , array('id'=>'en','name'=>'English') //อังกฤษ
//         ), 'id', 'name', '' )
//         ->value( !empty($this->me['lang']) ? $this->me['lang']:'en' );



$form  	->submit()
		->addClass("btn-submit btn btn-blue")
		->value("Save");
        
echo $form->html();