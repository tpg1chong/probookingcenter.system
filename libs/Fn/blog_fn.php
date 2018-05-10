<?php

class Blog_Fn extends _function
{

    public function item($data, $options=array())
    {
        $options = array_merge(array(
            // 'cell' => isset($_REQUEST['gcell']) ? $_REQUEST['gcell']: 4,

            'addClass' => isset($_REQUEST['gcls']) ? $_REQUEST['gcls']: '',
            'is_summary' => false,
            'is_more' => false,
            'is_number' => false,
        ), $options);

        $item = '';
        $number = 0;
        foreach ($data as $val) {
            $number ++;

            $image = '<div class="pic"></div>';
            if( !empty($val['image_url']) ){

                $image = '<a href="'.$val['url'].'" class="pic" data-plugins="prograssiveImage" data-options="'.$this->stringify( array(
                        'url'=> $val['image_url'],
                        'alt' => $val['title']
                    ) ).'"></a>';
            }

            $item .= '<div class="post" data-id="'.$val['id'].'"><div class="inner clearfix">'.

                // image
                '<div class="post-cover">'.$image.'</div>'.

                // content
                '<div class="post-content">'.

                    '<div class="post-header">'.
                        // number
                        ( $options['is_number']
                            ? '<div class="post-number">'.$number.'.</div>'
                            : ''
                        ).


                        // title
                        '<div class="post-title">'.
                            '<h2><a href="'.$val['url'].'" title="'.$val['title'].'">'.$val['title'].'</a></h2>'.
                        '</div>'.

                    '</div>'.

                    // details
                    '<div class="post-details"><ul class="clearfix">'.
                        '<li class="category"><a href="'.$val['forum_url'].'" title="'.$val['forum_name'].'">'.$val['forum_name'].'</a></li>'.
                        '<li class="date">'.$val['created_str'].'</li>'.
                    '</ul></div>'.

                    // summary
                    ( $options['is_summary']
                        ? '<div class="post-summary">'.$val['summary'].'</div>'
                        : ''
                    ).
                    
                    // footer
                    ( $options['is_more']
                        ? '<div class="post-footer"><a href="'.$val['url'].'" class="read-more"><span class="ico icon-chevron-right"></span><span class="txt">อ่านต่อ</span></a></div>'
                        : ''
                    ).

                '</div>'. // end: content

            '</div></div>';
        }


        $cls = 'blog';
        if( !empty( $options['addClass'] ) ){
            $cls .= !empty($cls) ? ' ':'';
            $cls .= $options['addClass'];
        }

        if( !empty( $options['is_number'] ) ){
            $cls .= !empty($cls) ? ' ':'';
            $cls .= 'blog-counting';
        }

        $attr = '';
        if( !empty( $options['attr'] ) ){

            if( is_array($options['attr']) ){
                foreach ($options['attr'] as $key => $value) {
                    $attr.= !empty($attr) ? ' ':'';
                    $attr.= "{$key}=\"{$value}\"";
                }
            }
        }
       
        $item = '<div class="'.$cls.'"'.$attr.'>'.$item.'</div>';
        return $item;
    }


    public function pagination( $options=array() )
    {

        $total = $options['total'];
        $limit = $options['limit'];
        $page = $options['page'];
        $length = isset($options['length']) ? $options['length']: 1;
        $url = isset($options['url']) ? $options['url']: URL;

        $pageTotal = ceil( $total/$limit );
        $min = $page-$length;

        $max = $page+$length;
        if( $pageTotal>5 ){

            if( $max > $pageTotal ){
                $min -= $max-$pageTotal;
            }

            if( $page <= $length ){
                $max += $length-$page;
                $max ++;
            }
        }

        $_min = true; $_max = true;

        $li = '';
        if( $page > 1 ){
            $li .= '<li><a href="'.$url.'?pager='.($page-1).'" class="page"><i class="icon-angle-left"></i></a></li>';
        }


        for ($i=1; $i <= $pageTotal; $i++) { 

            if( $i < $min || $i > $max ){

                if( $i < $min && $_min ){
                    $li .= '<li><span class="page text">..</span></li>';
                    $_min = false;
                }

                if( $i > $max && $_max ){
                    $li .= '<li><span class="page text">..</span></li>';
                    $_max = false;
                }
                continue;
            }

            if( $page==$i ){ 
                $li .= '<li class="active"><a class="page">'.$i.'</a></li>';
            }
            else{
                $li .= '<li><a href="'.$url.'?pager='.$i.'" class="page">'.$i.'</a></li>';
            }
        }

        if( $page != $pageTotal ){
            $li .= '<li><a href="'.$url.'?pager='.($page+1).'" class="page next"><i class="icon-angle-right"></i></a></li>';
        }

        return !empty($li) && $limit < $total
            ? '<nav class="pagination-wrap"><ul class="pagination clearfix">'.$li.'</ul></nav>'
            : '';
    }
	
}