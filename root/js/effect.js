 
  $jq(document).ready(function() {
    
     Breadcrumbs.init();
    
   $jq('#operator').live('click',function()  
    { 
      if($jq('#operator').attr("rel")) {
     $jq.post("/rest/livechat?open=1",function() {
        window.location.href="/tools/operator";
      });
      }else {
        var opBox = $jq("#operator-box");
        ajaxGet(opBox, "/rest/livechat", 0, 
        function(){ 
          if(opBox.hasClass("minimize")){
            opBox.children().hide();
          }
        });
        opLoaded = true;
        if(opBox.hasClass("minimize")){
            opBox.removeClass("minimize");
            opBox.animate({width:"9em"});
            opBox.children().show();
        }
        opTimer = setTimeout(function() {
          opBox.addClass("minimize");
          opBox.animate({width:"1.5em"});
          opBox.children().hide();

        }, 4000)
      }
    });  
  

   var contentBox = $jq(".comment-content"),
      contentBoxDefault = "write a comment..."

  contentBox.live('focus',function() {
    if($jq(this).val().trim() == contentBoxDefault) $jq(this).attr("value", "");
    $jq(".comment-submit").show();
  });
  contentBox.live('blur',function() {
    if($jq(this).val().trim() == "") {
      $jq(this).attr("value",contentBoxDefault);
      $jq(".comment-submit").hide();
    }
  });

    $jq(".feed").live('click',function() {
    var url=$jq(this).attr("rel");
    var div=$jq(this).parent().next("#widget-feed");
    div.filter(":hidden").empty().load(url);
    div.slideToggle('fast');
    });

    $jq("#nav-min-icon").addClass("ui-icon ui-icon-triangle-1-w");
    $jq(".tooltip").addClass("ui-icon ui-icon-lightbulb");
    
    openid.init('openid_identifier');
    $jq("#openid_identifier").focus();

    $jq(".sortable").sortable({
      handle: '.widget-header, #widget-footer',
      items:'li.widget',
      placeholder: 'placeholder',
      connectWith: '.sortable',
      opacity: 0.6,
      forcePlaceholderSize: true,
      update: function(event, ui) { updateLayout(); },
    });
    
    $jq("#widget-holder").children("#widget-header").disableSelection();

    $jq("div.columns a, div.columns div.ui-icon, div.columns>ul>li>a").live('click', function() {
      $jq("div.columns>ul").toggle();
    });

     $jq(".toggle").live('click',function() {
              $jq(this).toggleClass("active").next().slideToggle("fast");
              return false;
        });

    $jq("#nav-min").click(function() {
      var nav = $jq("#navigation");
      var ptitle = $jq("#page-title");
      var w = nav.width();
      var msg = "open sidebar";
      var marginLeft = '-1em';
      if(w == 0){ w = '12em'; msg = "close sidebar"; marginLeft = 175; }else { w = 0;}
      nav.animate({width: w}).show();
      ptitle.animate({marginLeft: marginLeft}).show();
      nav.children("#title").children("div").toggle();
      $jq(this).attr("title", msg);
      $jq(this).children("#nav-min-icon").toggleClass("ui-icon-triangle-1-w").toggleClass("ui-icon-triangle-1-e");
    });

    $jq(".module-min").live('click', function() {
        var module = $jq("div#" + $jq(this).attr("wname") + "-content");
        module.next().slideToggle("fast");
        module.slideToggle("fast");
        $jq(this).parent().toggleClass("minimized");
        if ($jq(this).attr("show") != 1){
          $jq(this).attr("show", 1).attr("title", "maximize");
          $jq(this).removeClass("ui-icon-circle-triangle-s").removeClass("ui-icon-triangle-1-s");
          $jq(this).addClass("ui-icon-circle-triangle-e");
        }else{
          $jq(this).attr("show", 0).attr("title", "minimize");
          $jq(this).removeClass("ui-icon-circle-triangle-e");
          $jq(this).addClass("ui-icon-circle-triangle-s");
        }
      });


/*
  $jq("div.bench div.content").droppable({
      accept: ".results-paper div.result",
      hoverClass: 'placeholder ui-corner-all',
      drop: function(event, ui){
                ui.draggable.find(".bench-update").trigger('click');
            },
      
  });*/

  $jq(".tip-simple").live('mouseover', function(){
    if(!($jq(this).children("div.tip-elem").show().children('span:not(".ui-icon")').text($jq(this).attr("tip")).size())){
      var tip = $jq('<div class="tip-elem tip ui-corner-all" style="display:block"><span>' + $jq(this).attr("tip") + '</span><span class="tip-elem ui-icon ui-icon-triangle-1-s"></span></div>');
      tip.appendTo($jq(this)).show();
    }
  });
  $jq(".tip-simple").live('mouseout', function(){
    $jq(this).children("div.tip-elem").hide();
  });
  
  

    $jq(".tooltip").live('mouseover',function() {
        $jq(this).cluetip({
        activation: 'click',
        sticky: true, 
        cluetipClass: 'jtip',
        dropShadow: false, 
        closePosition: 'title',
        arrows: true, 
//      height: '80px',
//      width: '450px',
        hoverIntent: false,
        //ajaxSettings : {
         //       type : "GET",
        //    data : "id=" + employee_id,
        //},
          });
    });



  var rss = new Raphael("footer-rss", 35, 30).path("M4.135,16.762c3.078,0,5.972,1.205,8.146,3.391c2.179,2.187,3.377,5.101,3.377,8.202h4.745c0-9.008-7.299-16.335-16.269-16.335V16.762zM4.141,8.354c10.973,0,19.898,8.975,19.898,20.006h4.743c0-13.646-11.054-24.749-24.642-24.749V8.354zM10.701,25.045c0,1.815-1.471,3.287-3.285,3.287s-3.285-1.472-3.285-3.287c0-1.813,1.471-3.285,3.285-3.285S10.701,23.231,10.701,25.045z").attr({fill: "#FFF", stroke: "none"});
  var t = new Raphael("footer-tweet", 35, 30).path("M23.295,22.567h-7.213c-2.125,0-4.103-2.215-4.103-4.736v-1.829h11.232c1.817,0,3.291-1.469,3.291-3.281c0-1.813-1.474-3.282-3.291-3.282H11.979V6.198c0-1.835-1.375-3.323-3.192-3.323c-1.816,0-3.29,1.488-3.29,3.323v11.633c0,6.23,4.685,11.274,10.476,11.274h7.211c1.818,0,3.318-1.463,3.318-3.298S25.112,22.567,23.295,22.567z").attr({fill: "#FFF", stroke: "none"});
  var email = new Raphael("footer-mail", 35, 30).path("M28.516,7.167H3.482l12.517,7.108L28.516,7.167zM16.74,17.303C16.51,17.434,16.255,17.5,16,17.5s-0.51-0.066-0.741-0.197L2.5,10.06v14.773h27V10.06L16.74,17.303z").attr({fill: "#FFF", stroke: "none"});

  icon_hover(rss);
  icon_hover(t);
  icon_hover(email);

  function icon_hover(e1){
    e1.hover(function (event) {
      this.attr({fill: "#6FA2D9"});
    }, function (event) {
      this.attr({fill: "white"});
    });
  }

  });



 
function commentNow(widget){
  goToAnchor("comment-content-" + widget);
  $jq("#comment-content-" + widget).focus();
}

function updateCounts(url){
  var comments = $jq(".comment-count");

  comments.load("/rest/feed/comment?count=1;url=" + url);
  var is = $jq("<span></span>");
  is.load("/rest/feed/issue?count=1;url=" + url, function(){
    if(is.html() != "0"){
      $jq(".issue-count").html("!").css({color:"red"});
    } 
  });
}


function hideTextOnFocus(selector){
  var area = $jq(selector);
    
  if(area.attr("value") != ""){
    area.siblings().fadeOut();
  }
  area.focus(function(){
    $jq(this).siblings().fadeOut();
  });

  area.blur(function(){
    if($jq(this).attr("value") == ""){
      $jq(this).siblings().fadeIn();
    }
  });
}

var StaticWidgets = {
  update: function(widget_id, path){
      if(!widget_id){ widget_id = "0"; }
      var widget = $jq("li#static-widget-" + widget_id);
      var widget_title = widget.find("input#widget_title").val();
      var widget_order = widget.find("input#widget-order").val();
      var widget_content = widget.find("textarea#widget_content").val();

      $jq.ajax({
            type: "POST",
            url: "/rest/widget/static/" + widget_id,
            dataType: 'json',
            data: {widget_title:widget_title, path:path, widget_content:widget_content, widget_order:widget_order},
            success: function(data){
                  StaticWidgets.reload(widget_id, 0, data.widget_id);
              },
            error: function(request,status,error) {
                alert(request + " " + status + " " + error );
              }
        }); 
  },
  edit: function(wname, rev) {
    
    var widget_id = wname.split("-").pop();
    var w_content = $jq("#" + wname + "-content");
    var widget = w_content.parent();
    var edit_button = widget.find("a#edit-button");
    if(edit_button.hasClass("ui-state-highlight")){
      StaticWidgets.reload(widget_id);
    }else{
      edit_button.addClass("ui-state-highlight");
      w_content.load("/rest/widget/static/" + widget_id + "?edit=1");
    }

  },
  reload: function(widget_id, rev_id, content_id){
    var w_content = $jq("#static-widget-" + widget_id + "-content");
    var widget = w_content.parent();
    var title = widget.find("h3 span.widget-title input");
    if(title.size()>0){
      title.parent().html(title.val());
    }
    widget.find("a.button").removeClass("ui-state-highlight");
    $jq("#nav-static-widget-" + widget_id).text(title.val());
    var url = "/rest/widget/static/" + (content_id || widget_id);
    if(rev_id) { url = url + "?rev=" + rev_id; } 
    w_content.load(url);
  },
  delete_widget: function(widget_id){
    if(confirm("are you sure you want to delete this widget?")){
      $jq.ajax({
        type: "POST",
        url: "/rest/widget/static/" + widget_id + "?delete=1",
        success: function(data){
          $jq("#nav-static-widget-" + widget_id).click().hide();
        },
        error: function(request,status,error) {
          alert(request + " " + status + " " + error );
        }
      }); 
    }
  },
  history: function(wname){
    var widget = $jq("#" + wname);
    var history = widget.find("div#" + wname + "-history");
    if(history.size() > 0){
      history.toggle();
      widget.find("a#history-button").toggleClass("ui-state-highlight");
    }else{
      var widget_id = wname.split("-").pop();
      var history = $jq('<div id="' + wname + '-history"></div>'); 
      history.load("rest/widget/static/" + widget_id + "?history=1");
      widget.find("div.content").append(history);
      widget.find("a#history-button").addClass("ui-state-highlight");
    }
  }
}





var Breadcrumbs = {
  init: function() {
    this.bc = $jq('#breadcrumbs');
    if (!this.bc) { return; };
    this.children = this.bc.children(),
    this.bCount = this.children.size();
    if(this.bCount < 3){ return; }; //less than three items, don't bother with breadcrumbs
    this.exp = false;
    this.bc.empty();
    var hidden = this.children.slice(0, (this.bCount - 2));
    var shown = this.children.slice((this.bCount - 2));
    this.hiddenContainer = $jq('<span id="breadcrumbs-hide"></span>');
    this.hiddenContainer.append(hidden).children().after(' &raquo; ');

    this.bc.append('<span id="breadcrumbs-expand" class="tip-simple" tip="exapand"></span>').append(this.hiddenContainer).append(shown);
    this.bc.children(':last').before(" &raquo; ");
   
    this.arrow = new Raphael("breadcrumbs-expand", 35, 50).path("m 20.546006,26.799417 -18.8190097,24.999999 0,-50.0000002 18.8190097,25.0000012 z").attr({fill: "#666", stroke: "none", scale:"0.6, 0.4", rotation:"180"});
    this.expand = $jq("#breadcrumbs-expand");
    
    this.expand.hover( function() { 
        Breadcrumbs.arrow.animate({fill:"#999", scale:"0.6, 0.4"}, 200);
      }, function() {  Breadcrumbs.arrow.animate({fill:"#666", scale:"0.6, 0.4"}, 200); 
      }
    );
    this.expand.click( function(){
      if( Breadcrumbs.exp ){ Breadcrumbs.show(); }
      else{ Breadcrumbs.hide(); }
    });
    this.width = this.hiddenContainer.width();
    this.hide();
  },
  
  show: function(){
    Breadcrumbs.hiddenContainer.animate({width:Breadcrumbs.width}, function(){ Breadcrumbs.hiddenContainer.css("width", "auto");}).css("visibility", 'visible');
    Breadcrumbs.expand.attr("tip", "minimize");
    Breadcrumbs.arrow.rotate(180);
    Breadcrumbs.exp = false;
  },
  
  hide: function() {
    Breadcrumbs.hiddenContainer.animate({width:0}, function(){ Breadcrumbs.hiddenContainer.css("visibility", 'hidden');});     
    Breadcrumbs.expand.attr("tip", "expand");
    Breadcrumbs.arrow.rotate(180);
    Breadcrumbs.exp = true;
  }
}