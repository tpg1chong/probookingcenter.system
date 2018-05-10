<?php

class Logout extends Controller {

    function __construct() {
        parent::__construct();
    }

    public function index(){
        $this->admin();

    }

    public function admin() {
        
        $url = URL;
        $this->view->setPage('theme', 'login');

        if( $this->format == 'json' ){
            $this->view->render('confirm_logout');
            exit;
        }

        if( empty($this->me) ){
            header('location:' . $url );
        }

        Session::init();
        Session::destroy();

        $url = !empty($_REQUEST['next'])
            ? $_REQUEST['next']
            : $url;

        Cookie::clear( COOKIE_KEY_AGENCY );
        Cookie::clear( COOKIE_KEY_ADMIN );
        Cookie::clear( 'login_role' );
        
        header('location:' . $url);
    }

}