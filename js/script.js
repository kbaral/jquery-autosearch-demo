document.write('<script type="text/javascript" src="js/common.js"></script>');

$(document).ready(function() {
    
  document.body.style.overflow = "auto";
/* Added by ganthiraj on 08-06-2017*/
if(sessionStorage.ObjectSelValue !== undefined)
	$('#viewCartBtn span').text("("+JSON.parse(sessionStorage.ObjectSelValue).length+")");
else
	$('#viewCartBtn span').text("(0)");
/* End */
 $('#viewCartBtn').css('display', 'inline-block');

    $("#viewCart, #viewCartBtn").click(function() {
       // window.close();
       // window.open('RequestBasket.html');
        location.href = 'RequestBasket.html';

    })

    $(".attach").click(function() {
        $(this).next().trigger("click");
    })


    $("#open_popup4").click(function() {
        $("#popup4").css("display", "block");
        $('.overlay').css({
            'height': $(document).height(),
            'width': $(document).width(),
            'display': 'block'
        });
    });

    var obj = []; 


    

    $(".close_popup_form, .overlay, #delete_cancel, .close_popup_section").click(function() {
        $('.overlay, .popup').hide();
         document.body.style.overflow = "auto";
    });

     $(".close_all_popup").click(function() {
        $('.overlay, .popup').hide();
         document.body.style.overflow = "auto";
    });


       
        $(".close_popup, .add_more").click(function() {
        var btnType = $(this).attr('id');
        /** js for uploading in live server*/
        $("#popup2").css("display", "none");
        $("#popup1").css("display", "block");
		if(btnType=='btnData1'){
			$('#data-serv').css('display', 'block');
			$('#web-serv').css('display', 'none');
			}else{
			$('#data-serv').css('display', 'none');
			$('#web-serv').css('display', 'block');	
		}		
        $(".error_msg_container1, .error_msg_container, .error_msg_container2").hide();
        $("#object_selectbox, #Operation_selectbox .ms-options-wrap > button").removeAttr("style");
        $('#catalog_selectbox, #schema_selectbox, #object_selectbox, #Operation_selectbox').find("option:gt(0)").remove();
      // not working in IE after submission
        //  $("#object_selectbox, #Operation_selectbox").multiselect( 'unload' );
        $("#object_selectbox, #Operation_selectbox").removeAttr("multiple");
        $("#object_selectbox, #Operation_selectbox").find('option').remove();
        $('#object_selectbox, #Operation_selectbox').append('<option value="option1">-- select --</option>');
        
        $('#database_selectbox').prop("selectedIndex", 0);
        $('#catalog_selectbox,  #object_selectbox, #schema_selectbox, #Operation_selectbox').find("option:gt(0)").remove();
        // alert(0);
      	$('#path_selectbox, #webService_selectbox, #operation_selectbox').prop("selectedIndex", 0);
        /** js for uploading in live server*/

    });


    $("#addtocart").click(function() {
		    var gState = $('#data-serv').is(':hidden');
            $(".error_msg_container1 #error_msg2 ul").html("");
            $(".error_msg_container, .error_msg_container1 .error_msg_container2").hide();
            $('#viewcart_table tbody').html("");
		
		if(gState == false){
        if ($("#object_selectbox").val()=="option1" || $("#object_selectbox").val()=== null || $("#object_selectbox").val()=="") {
            $(".error_msg_container").show();
            $(".error_msg_container1").hide();
            $("#object_selectbox, .ms-options-wrap > button").css("border","1px solid red");
            return false;
        } else {
            $(".error_msg_container").hide();
            $("#object_selectbox").removeAttr('style');
            var object_sel_value = [];
            var object_sel_ID = [];
            var object_form_ID = [];
            var selected_form_id;            

            var selected_items = [];
			
          
            selected_ID = $('#object_selectbox').val();
            console.log("selected id is"+selected_ID); 
            var sessionlength = ''; 
            if(sessionStorage.ObjectSelValue == undefined)
                {
                    sessionlength = 0; 
                } 
                else{ 
                    var strObject = JSON.parse(sessionStorage.ObjectSelValue);
                    sessionlength = strObject.length 
                } 
            if(selected_ID.length > 10 || (selected_ID.length + sessionlength) > 10)
                {
                    //alert("YES"); 
                    $("#object_selectbox").multiselect( 'reload' );
                    $("#object_selectbox, .ms-options-wrap > button").css("border","1px solid red");
                    $(".error_msg_container2").show();
                    return false; 
                } 
               

            var sessionExistValue = '';
            if (sessionStorage.ObjectSelValue !== undefined) {
                var sessionValue = JSON.parse(sessionStorage.ObjectSelValue);
                //  console.log(JSON.stringify(sessionValue));
                 

                for (var i=0; i<sessionValue.length; i++){ 
                    if(selected_ID.indexOf(sessionValue[i].object_id) != -1)  
                    {        
                        sessionExistValue += "<li>" + sessionValue[i].object_value + '</li>';
                    }    
                           
                } 
               
                 /*   if((selected_ID.sessionValue[i].object_value) != undefined)  
                    {        
                        sessionExistValue += sessionValue[i].object_value + ',';
                        console.log(sessionExistValue);
                    }    */
                 
                 

                if(sessionExistValue != '')
                {
                    //alert("Data Asset already exist in the cart are "+sessionExistValue);

                    $(".error_msg_container1 #error_msg2 ul").append(sessionExistValue);

                    $("#object_selectbox").multiselect( 'reload' );
                    $(".error_msg_container").hide();
                    $(".error_msg_container1").show();
                    $("#object_selectbox, .ms-options-wrap > button").css("border","1px solid red");

                }
                
            } 
            if(sessionExistValue == '') {

                $("#popup1").css("display", "none");
                $("#popup2").css("display", "block");
                $('.overlay').css({
                    'height': $(document).height(),
                    'width': $(document).width(),
                    'display': 'block'
                });

				//console.log('Storage :'+typeof(Storage));
                if (typeof(Storage) !== "undefined") {

                    var obj_path, obj_name, required_flag,appendval, selected_value, selected_ObjID, selected_serviceType;

                   /*$.get("https://wbgservicedev.worldbank.org/json/Application/BUSINESS_DIRECTORY/DATA_CATALOG/getCISObjectPropertyByID?in_object_id=" + selected_ID, function(data) {*/
					//console.log(hostcisurl+"/json/Application/BUSINESS_DIRECTORY/DATA_CATALOG/getCISObjectPropertyByID?in_object_id="+selected_ID);
					$.ajax
					({
                        type: "GET",
                        url: nodeproxyurl +'?qs=%2Fjson%2FApplication%2FBUSINESS_DIRECTORY%2FDATA_CATALOG%2FgetCISObjectPropertyByID%3Fin_object_id='+selected_ID,
						//url: hostcisurl+"/json/Application/BUSINESS_DIRECTORY/DATA_CATALOG/getCISObjectPropertyByID?in_object_id="+selected_ID,
						dataType: 'json',				
						headers: {   
						'Content-Type': 'application/json; charset=utf-8'
						},				
						
						//data: { "in_object_id" : selected_ID }, 
						
						
						success: function (data){
							//console.log('JSON.stringify(data)'+JSON.stringify(data));
                           var data =  data.BD_CIS_OBJECT_PROPERTIES.BD_CIS_OBJECT_PROPERTY;

                            //console.log(JSON.stringify(data));
                            if (sessionStorage.ObjectSelValue !== undefined) {
                                str = sessionStorage.ObjectSelValue; 
                                strObject = JSON.parse(str);
                                for(var i=0; i<strObject.length;i++)
                                {
                                    selected_items.push(strObject[i]);
                                }
                                
                            }
                            
                            $.each(data, function( index, value ) {
                                obj_path = value.OBJECT_PATH;
                                required_flag = value.CLEARANCE_REQUIRED_FLAG;
                                selected_form_id = value.FORM_ID;
                                selected_value = value.OBJECT_NAME;
                                selected_ObjID = value.OBJECT_ID;
								selected_serviceType = value.OBJECT_SERVICE_TYPE;
								//alert('selected_serviceType'+selected_serviceType);
                                appendval = '<tr><td><div class="ico_folder_set clearfix"><span class="img_section"><img src="images/ico_folder1.png" alt=""></span><span id="object_popValue">'+ selected_value +'</span></div></td>';    

                                if (required_flag == 'Y') {
                                    appendval += '<td><div class="clr1" id="required_flag">REQUIRED</div></td></tr>';
                                } else {
                                    appendval += '<td><div class="clr1" id="required_flag">NOT REQUIRED</div></td></tr>';
                                }
                                $('#viewcart_table tbody').append(appendval);
                                
                                if(selected_form_id === null)
                                 {
                                    selected_form_id = 9999;
                                 }

                                selected_details = jQuery.parseJSON( '{ "object_value" :"'+selected_value+'", "object_id":"'+selected_ObjID+'", "form_id":"'+selected_form_id+'","service_type":"'+selected_serviceType+'" }' );                                    
                                selected_items.push(selected_details);
                                
                            });

                            $(".view_item_count").html(data.length);
                            
                            var selected_items_sort = selected_items.sort(function(a, b){
                               return a.form_id - b.form_id;
                            });

							$('#viewCartBtn span, .cartItem_count').text("("+selected_items_sort.length+")"); 	// Added by ganthiraj On 08-06-2017
                            sessionStorage.setItem("ObjectSelValue", JSON.stringify(selected_items_sort));
						}
                                                         
                    });

                } else {
                    console.log("Sorry, your browser does not support Web Storage...");
                }

            }
        }

        
}
// start
if(gState == true){
        if ($("#Operation_selectbox").val()=="option1" || $("#Operation_selectbox").val()=== null || $("#Operation_selectbox").val()=="") {
            $(".error_msg_container").show();
            $(".error_msg_container1").hide();
            $("#Operation_selectbox, .ms-options-wrap > button").css("border","1px solid red");
            return false;
        } else {
            $(".error_msg_container").hide();
            $("#Operation_selectbox").removeAttr('style');
            var object_sel_value = [];
            var object_sel_ID = [];
            var object_form_ID = [];
            var selected_form_id;            

            var selected_items = [];
          
            selected_ID = $('#Operation_selectbox').val();
            //console.log("selected id is"+selected_ID);
            var sessionlength = ''; 
            if(sessionStorage.ObjectSelValue == undefined)
                {
                    sessionlength = 0; 
                    
                } 
                else{                   
                    var strObject = JSON.parse(sessionStorage.ObjectSelValue); 
                    //var strObject = sessionStorage.ObjectSelValue; 
                    sessionlength = strObject.length;
                } 
            if(selected_ID.length > 10 || (selected_ID.length + sessionlength) > 10)
                {
                    //alert("YES"); 
                    $("#Operation_selectbox").multiselect( 'reload' );
                    $("#Operation_selectbox, .ms-options-wrap > button").css("border","1px solid red");
                    $(".error_msg_container2").show();
                    return false; 
                } 
               


            var sessionExistValue = '';
            if (sessionStorage.ObjectSelValue !== undefined) {
                var sessionValue = JSON.parse(sessionStorage.ObjectSelValue);
                //  console.log(JSON.stringify(sessionValue));
                      

                for (var i=0; i<sessionValue.length; i++){ 
                    if(selected_ID.indexOf(sessionValue[i].object_id) != -1)  
                    {        
                        sessionExistValue += "<li>" + sessionValue[i].object_value + '</li>';
                    }    
                           
                }

               



                 /*   if((selected_ID.sessionValue[i].object_value) != undefined)  
                    {        
                        sessionExistValue += sessionValue[i].object_value + ',';
                        console.log(sessionExistValue);
                    }    */
                 
                 

                if(sessionExistValue != '')
                {
                    //alert("Data Asset already exist in the cart are "+sessionExistValue);

                    $(".error_msg_container1 #error_msg2 ul").append(sessionExistValue);

                    $("#Operation_selectbox").multiselect( 'reload' );
                    $(".error_msg_container").hide();
                    $(".error_msg_container1").show();
                    $("#Operation_selectbox, .ms-options-wrap > button").css("border","1px solid red");

                }
                
            } 
            if(sessionExistValue == '') {

                $("#popup1").css("display", "none");
                $("#popup2").css("display", "block");
                $('.overlay').css({
                    'height': $(document).height(),
                    'width': $(document).width(),
                    'display': 'block'
                });

				console.log('Storage :'+typeof(Storage));
                if (typeof(Storage) !== "undefined") {

                    var obj_path, obj_name, required_flag,appendval, selected_value, selected_ObjID,selected_serviceType;
                    //console.log(nodeproxyurl +'?qs=%2Fjson%2FApplication%2FBUSINESS_DIRECTORY%2FDATA_ACCESS_REQUEST%2FpostDataAccessRequestDetail%3Fin_AccessRequestDetail%3D' + requestAccess + '&in_ObjectDetails=' + objDetails); 
                    
                   /*$.get("https://wbgservicedev.worldbank.org/json/Application/BUSINESS_DIRECTORY/DATA_CATALOG/getCISObjectPropertyByID?in_object_id=" + selected_ID, function(data) {*/
					//console.log(hostcisurl+"/json/Application/BUSINESS_DIRECTORY/DATA_CATALOG/getCISObjectPropertyByID?in_object_id="+selected_ID);
					$.ajax
					({
                        type: "GET",
                        url: nodeproxyurl +'?qs=%2Fjson%2FApplication%2FBUSINESS_DIRECTORY%2FDATA_CATALOG%2FgetCISObjectPropertyByID%3Fin_object_id='+selected_ID,
						//url: hostcisurl+"/json/Application/BUSINESS_DIRECTORY/DATA_CATALOG/getCISObjectPropertyByID?in_object_id="+selected_ID,
						dataType: 'json',				
						headers: {   
						'Content-Type': 'application/json; charset=utf-8'
						},				
						
						//data: { "in_object_id" : selected_ID }, 
						
						
						success: function (data){
							console.log('JSON.stringify(data)'+JSON.stringify(data));
                           var data =  data.BD_CIS_OBJECT_PROPERTIES.BD_CIS_OBJECT_PROPERTY;

                            //console.log(JSON.stringify(data));
                            if (sessionStorage.ObjectSelValue !== undefined) {
                                str = sessionStorage.ObjectSelValue; 
                                strObject = JSON.parse(str);
                                for(var i=0; i<strObject.length;i++)
                                {
                                    selected_items.push(strObject[i]);
                                }
                                
                            }
                            
                            $.each(data, function( index, value ) {
                                obj_path = value.OBJECT_PATH;
                                required_flag = value.CLEARANCE_REQUIRED_FLAG;
                                selected_form_id = value.FORM_ID;
                                selected_value = value.OBJECT_NAME;
                                selected_ObjID = value.OBJECT_ID;
								selected_serviceType = value.OBJECT_SERVICE_TYPE;
                                appendval = '<tr><td><div class="ico_folder_set clearfix"><span class="img_section"><img src="images/ico_folder1.png" alt=""></span><span id="object_popValue">'+ selected_value +'</span></div></td>';    

                                if (required_flag == 'Y') {
                                    appendval += '<td><div class="clr1" id="required_flag">REQUIRED</div></td></tr>';
                                } else {
                                    appendval += '<td><div class="clr1" id="required_flag">NOT REQUIRED</div></td></tr>';
                                }
                                $('#viewcart_table tbody').append(appendval);
                                
                                if(selected_form_id === null)
                                 {
                                    selected_form_id = 9999;
                                 }

                                selected_details = jQuery.parseJSON( '{ "object_value" :"'+selected_value+'", "object_id":"'+selected_ObjID+'", "form_id":"'+selected_form_id+'","service_type":"'+selected_serviceType+'" }' );                                    
                                selected_items.push(selected_details);
                                
                            });

                            $(".view_item_count").html(data.length);
                            
                            var selected_items_sort = selected_items.sort(function(a, b){
                               return a.form_id - b.form_id;
                            });

							$('#viewCartBtn span, .cartItem_count').text("("+selected_items_sort.length+")"); 	// Added by ganthiraj On 08-06-2017
                            sessionStorage.setItem("ObjectSelValue", JSON.stringify(selected_items_sort));
						}
                                                         
                    });

                } else {
                    console.log("Sorry, your browser does not support Web Storage...");
                }

            }
        }

        
}
//end


    });

			


    $(".request_history_tab ul li a").click(function() {
        var current_tab = $(this).attr('rel');
        $('.request_history_tab ul li a').removeClass('active');
        $(this).addClass('active');
        $('.tabs_content > div').hide();
        $('.tabs_content >div' + '#' + current_tab).show();
    })

    $("#request_submit").click(function() {
        $("#popup").css("display", "none");
        $('.overlay, .popup').hide();
        $('#open_popup img').attr('src', 'images/ico_policy1.png');
    });

    $("#request_submit1").click(function() {
        $("#popup").css("display", "none");
        $('.overlay, .popup').hide();
        $('#open_popup4 img').attr('src', 'images/ico_policy1.png');
    });

   $("#Request_submitBtn").click(function() {       
            var val = '';
            var empty_valid= '';
           
		   $("#Request_submitBtn").hide();
		   
            if(sessionStorage.ObjectSelValue == undefined)
            {
                $("#dataalert_popup").css("display", "block");
                $('.dataalert_content').html("Please select at least one object");
                $('.overlay').css({
                    'height': $(document).height(),
                    'width': $(document).width(),
                    'display': 'block'
                });
				$("#Request_submitBtn").show();
                return false;
            }
            else if(sessionStorage.ObjectSelValue !== undefined)
           {
	
                $(".empty_validation").each(function(index, element) {
                    if(!$(this).val())
                    {
                        val++; 
                        if($(this).parent().html().indexOf('<span><a href="javascript:;" id="open_popup">') != -1 || $(this).parent().html().indexOf('<span><a href="javascript:;" id="open_popup" class="">') != -1)
                        {
                            
                            $(this).parent().find('span a').html('<img src="images/arrow.gif"><img src="images/ico_pdf.png">'); // Change it as arrow symbol + pdf img for validating the alpaca form 
                             empty_valid = 'policy';
                        }

                    }
                    
                });
                /* Modified code by ganthiraj on 28/06/2017 for validation message */
                if(empty_valid != '')
                {
					$("#dataalert_popup").css("display", "block");
					$('.dataalert_content').html("Please fill the Policy Q&A Details");
					$('.overlay').css({
									'height': $(document).height(),
									'width': $(document).width(),
									'display': 'block'
					});
					empty_valid = '';
					$("#Request_submitBtn").show();

					return false;
                }
                else
                {
					 $(".empty_validation").each(function(index, element) {
						 $(this).removeAttr("style");
							if(!$(this).val())
							{
								val++; 
								if($(this).parent().html().indexOf('<span><a href="javascript:;" id="open_popup">') != -1 || $(this).parent().html().indexOf('<span><a href="javascript:;" id="open_popup" class="">') != -1)
								{
									
									$(this).parent().find('span a').html('<img src="images/arrow.gif"><img src="images/ico_pdf.png">'); // Change it as arrow symbol + pdf img for validating the alpaca form 
									 empty_valid = 'policy';
								}
								else
								{
									//alert("validation");
									 $(this).css("border","1px solid red");
								}
	
							}
						
					});
	
	
					if (val != '' && sessionStorage.ObjectSelValue !== undefined) {
						$('.alps-form:not(.form-completed)').each( function(i) {
								$(this).css("background", "url('images/arrow.gif') no-repeat left top");
							});
						$('.form-completed').each( function(i) {
								$(this).css("background", "none");
							});
						$("html, body").animate({ scrollTop: 0 });	
						$("#dataalert_popup").css("display", "block");
						$('.dataalert_content').html("Enter all the required field");
						$('.overlay').css({
										'height': $(document).height(),
										'width': $(document).width(),
										'display': 'block'
						});
						$("#Request_submitBtn").show();
						return false;
					} 
                }
	
                /* END */



                if (val != '' && sessionStorage.ObjectSelValue !== undefined) {
                    $("#dataalert_popup").css("display", "block");
                    $('.dataalert_content').html("Enter all the required field");
                    $('.overlay').css({
                        'height': $(document).height(),
                        'width': $(document).width(),
                        'display': 'block'
                    });
					$("#Request_submitBtn").show();
                    return false;
                } 
            }
  
        /* Modified by Ganthiraj on 08-06-2017 */
		$("#loading-img").css("display", "block");
		$(".loading-overlay").css("display", "block");
        var requestAccess,objDetails,alpacaValue = '';
        
       // requestAccess = '<accessRequests><accessRequest><projectName>'+$("#project_name").val()+'</projectName><unit>'+$("#unit").val()+'</unit><requestorName>'+$("#Requester").val()+'</requestorName><requestedDate>'+$("#Requester_date").val()+'</requestedDate><expectedOutput>'+$("#expected_data").val()+'</expectedOutput><refreshFrequency>'+$("#dataRefreshFreq").val()+'</refreshFrequency><dataAccessMethod>'+$("#data_access").val()+'</dataAccessMethod><expectedDataVolume>'+$("#expectedDataVolume").val()+'</expectedDataVolume><projectDetails>'+$("#project_detail").val()+'</projectDetails><useCase>'+$("#use_case").val()+'</useCase><projectCurrentStage>'+$("#current_project").val()+'</projectCurrentStage></accessRequest></accessRequests>';

          //requestAccess = '<accessRequests><accessRequest><projectName>'+$("#project_name").val()+'</projectName><briefProjectDetail>'+$("#project_details").val()+'</briefProjectDetail><projectContactName>'+$("#project_contact_name").val()+'</projectContactName><projectContactUPI>'+$("#project_contact_upi").val()+'</projectContactUPI><requestorName>'+$("#requester_name").val()+'</requestorName><requestingUnitName>'+$("#request_unit_name").val()+'</requestingUnitName><requestorUPI>'+$("#requester_upi").val()+'</requestorUPI><requestedDate>'+$("#Requester_date").val()+'</requestedDate><formatForDataOutput>'+$("#format_data_output").val()+'</formatForDataOutput><dataAccessMethod>'+$("#data_access_method").val()+'</dataAccessMethod><expectedDataVolume>'+$("#data_volume").val()+'</expectedDataVolume><dataRefreshFrequency>'+$("#data_refresh_frequency").val()+'</dataRefreshFrequency><useCase>'+$("#use_case").val()+'</useCase><additionalComments>'+$("#comments").val()+'</additionalComments><requestorEmail>'+sessionStorage.getItem('Email')+'</requestorEmail><projectContactEmail>'+$("#project_contact_email").val()+'</projectContactEmail></accessRequest></accessRequests>';
            requestAccess = '<accessRequests><accessRequest><projectName>'+$("#project_name").val()+'</projectName><briefProjectDetail>'+$("#project_details").val()+'</briefProjectDetail><projectContactName>'+$("#project_contact_name").val()+'</projectContactName><projectContactUPI>'+$("#project_contact_upi").val()+'</projectContactUPI><requestorName>'+$("#requester_name").val()+'</requestorName><requestingUnitName>'+$("#request_unit_name").val()+'</requestingUnitName><requestorUPI>'+$("#requester_upi").val()+'</requestorUPI><requestedDate>'+$("#Requester_date").val()+'</requestedDate><formatForDataOutput></formatForDataOutput><dataAccessMethod>'+$("#data_access_method").val()+'</dataAccessMethod><expectedDataVolume>'+$("#data_volume").val()+'</expectedDataVolume><dataRefreshFrequency>'+$("#data_refresh_frequency").val()+'</dataRefreshFrequency><useCase>'+$("#use_case").val()+'</useCase><additionalComments>'+$("#comments").val()+'</additionalComments><requestorEmail>'+sessionStorage.getItem('Email')+'</requestorEmail><projectContactEmail>'+$("#project_contact_email").val()+'</projectContactEmail><webserviceAccessMethod>'+$("#webservice_data_output").val()+'</webserviceAccessMethod><expectedWebserviceOutput>'+$("#webservice_output").val()+'</expectedWebserviceOutput></accessRequest></accessRequests>';
    //  console.log(requestAccess);
    //encodeURIComponent(requestAccess); 
            objectDetails = JSON.parse(sessionStorage.ObjectSelValue);
            objDetails = "<objectDetails>";
            for(var i=0; i<objectDetails.length;i++)
            {
                objDetails += "<objectDetail><formID>"+objectDetails[i].form_id+"</formID><objectID>"+objectDetails[i].object_id+"</objectID><objectName>"+objectDetails[i].object_value+"</objectName></objectDetail>";                
            }
            objDetails += "</objectDetails>";
			//console.log(encodeURIComponent(alpacaValue)+"\n\n"+'request Access is'+requestAccess +"\n\n"+objDetails);
            if(localStorage.alpacaValue !== undefined && localStorage.alpacaValue != '')
			{
				alpacastr = JSON.parse(localStorage.alpacaValue);
				alpacaValue = '<BDformData>';
				for (var i=0; i<alpacastr.length; i++){ 
					alpacaValue += alpacastr[i];
				}
				alpacaValue += "</BDformData>";
				
            }
          
			if (alpacaValue == '') {
				$.ajax
				({
                    type: "POST",
                    url: nodeproxyurl +'?qs=%2Fjson%2FApplication%2FBUSINESS_DIRECTORY%2FDATA_ACCESS_REQUEST%2FpostDataAccessRequestDetail%3Fin_AccessRequestDetail%3D' + requestAccess + '%26in_ObjectDetails%3D' + objDetails,
					//url: hostcisurl+"/json/Application/BUSINESS_DIRECTORY/DATA_ACCESS_REQUEST/postDataAccessRequestDetail?in_AccessRequestDetail=" + requestAccess + "&in_ObjectDetails=" + objDetails,
                   // console.log(url);
                    dataType: 'json',				
					headers: {   
					'Content-Type': 'application/json; charset=utf-8'
					},				
					
					//data: { "in_AccessRequestDetail" : requestAccess , "in_ObjectDetails" : objDetails },					
					success: function (data, status){
						//console.log("RequestResponseStatus if : " + data.accessRequestResponse['status'] + "RequestCreatedID" + data.accessRequestResponse['requestNBR']);

							

                        if (data.accessRequestResponse['status'] == 1) {
							$("#loading-img").css("display", "none");
							$(".loading-overlay").css("display", "none");
                            $('#reqAccessID').html(data.accessRequestResponse['requestNBR']);
                            $("#popup").css("display", "none");
                            $("#popup3").css("display", "block");
                            $('.overlay').css({
                                'height': $(document).height(),
                                'width': $(document).width(),
                                'display': 'block'
                            });
                            $('#resetBtn').trigger("click");
                            gettodayDate();
                            sessionStorage.removeItem("ObjectSelValue");
							localStorage.removeItem("alpacaValueIndex");
							localStorage.removeItem("alpacaValue"); 
							$("#Request_submitBtn").show();
							
                        } else {
							$("#loading-img").css("display", "none");
							$(".loading-overlay").css("display", "none");
							$("#Request_submitBtn").show();
                            $("#popup7").css("display", "block");
                            $('.overlay').css({
                                'height': $(document).height(),
                                'width': $(document).width(),
                                'display': 'block', 
                                'pointer-events': 'none'
                            });  			
                        }
                        //console.log("status-if:" + status);
					},
					error: function (xhr) {
						$("#loading-img").css("display", "none");
						$('.loading-overlay').css("display", "none");
                        $("#popup7").css("display", "block");
                        $('.overlay').css({
                            'height': $(document).height(),
                            'width': $(document).width(),
                            'display': 'block', 
                            'pointer-events': 'none'
                        });  
						
					}
            	});
            } else {
                var str = nodeproxyurl +'?qs=%2Fjson%2FApplication%2FBUSINESS_DIRECTORY%2FDATA_ACCESS_REQUEST%2FpostDataAccessRequestDetail%3Fin_AccessRequestDetail%3D' + requestAccess + '%26in_ObjectDetails%3D' + objDetails + '%26in_FormData%3D' + alpacaValue ;                 
                //var str = hostcisurl +'/json/Application/BUSINESS_DIRECTORY/DATA_ACCESS_REQUEST/postDataAccessRequestDetail?in_AccessRequestDetail=' + encodeURIComponent(requestAccess) + '&in_ObjectDetails=' + encodeURIComponent(objDetails) + '&in_FormData=' + encodeURIComponent(alpacaValue);
                console.log('str' + str);
                //str = encodeURI(str);
				$.ajax
				({
					type: "POST",
					url: str,
					dataType: 'json',				
					headers: {   
					'Content-Type': 'application/json; charset=utf-8'
					},				
					
					//data: { "in_AccessRequestDetail" : requestAccess , "in_ObjectDetails" : objDetails , "in_FormData" : encodeURIComponent(alpacaValue) },					
					success: function (data, status){	
						console.log('submit-data-response :'+JSON.stringify(data));			
                        //console.log("RequestResponseStatus else : " + data.accessRequestResponse['status'] + "RequestCreatedID" + data.accessRequestResponse['requestNBR']);

                        if (data.accessRequestResponse['status'] == 1) {
							$("#loading-img").css("display", "none");
							$(".loading-overlay").css("display", "none");
                            $('#reqAccessID').html(data.accessRequestResponse['requestNBR']);
                            $("#popup").css("display", "none");
                            $("#popup3").css("display", "block");
                            $('.overlay').css({
                                'height': $(document).height(),
                                'width': $(document).width(),
                                'display': 'block'
                            });
                            $('#resetBtn').trigger("click");
                            gettodayDate();
                            sessionStorage.removeItem("ObjectSelValue");
							localStorage.removeItem("alpacaValueIndex");
							localStorage.removeItem("alpacaValue"); 
							$("#Request_submitBtn").show();
                        } else {
                            $("#Request_submitBtn").show(); 
                            $("#loading-img").css("display", "none");
                            $("#popup8").css("display", "block");
                            $('.overlay').css({
                                'height': $(document).height(),
                                'width': $(document).width(),
                                'display': 'block', 
                                'pointer-events': 'none'
                            });  
                        }
                        //console.log("status-else" + status);
					}
            	});
            }
        /* END */


    });



    $(document).on("click", ".row_delete", function() {
        $("#popup5").css("display", "block");
        $('.overlay').css({
            'height': $(document).height(),
            'width': $(document).width(),
            'display': 'block'
        });



    });



    $(document).on("click", ".row_delete", function() {
        removeObjID = $(this).parents('tr').attr("class");
    });

    $(document).on("click", "#delete_confirmBtn", function() {

        var sessionValue = JSON.parse(sessionStorage.ObjectSelValue);
        var sessionRemoveIndex, sessionRemoveFormId, sessionRemoveAlpacaIndex = '';        
		//console.log('sessionValue:'+JSON.stringify(sessionValue));
				
        for (var i=0; i<sessionValue.length; i++){           
             if(sessionValue[i].object_id==removeObjID){
               sessionRemoveIndex = i; 
			   sessionRemoveFormId = sessionValue[i].form_id;              
              break;
             }             
        }
		sessionValue.splice(sessionRemoveIndex,1);
		sessionStorage.setItem("ObjectSelValue", JSON.stringify(sessionValue));
		
		for (var i=0; i<sessionValue.length; i++){           
             if(sessionValue[i].form_id==sessionRemoveFormId){
              sessionRemoveFormId = '';             
              break;
             }             
        }
        //console.log("sessionRemoveFormId:"+sessionRemoveFormId);		
		if(sessionRemoveFormId != '' && localStorage.alpacaValueIndex !== undefined)
		{
			str = localStorage.alpacaValueIndex; 
			str1 = localStorage.alpacaValue;
			strObject = JSON.parse(str);
			strObject1 = JSON.parse(str1);
			for(var i=0; i<strObject.length;i++)
			{
				if(sessionRemoveFormId == strObject[i])
				{	
					sessionRemoveAlpacaIndex = i;
					break;
				}
			}
			//console.log('sessionRemoveAlpacaIndex'+sessionRemoveAlpacaIndex);
			//return false;
			strObject.splice(sessionRemoveAlpacaIndex,1);
			strObject1.splice(sessionRemoveAlpacaIndex,1);
			localStorage.setItem("alpacaValueIndex", JSON.stringify(strObject));
			localStorage.setItem("alpacaValue", JSON.stringify(strObject1));			
			//console.log('localStorage.alpacaValue : '+localStorage.alpacaValue);
		}
		//return false;
       

        $(".cartItem_count").text(sessionValue.length);
       
        var current_row_formId = $("#basket_table tr." + removeObjID).find("td input[type=hidden]").val();
        var prev_row_formID = $("#basket_table tr." + removeObjID).prev("tr").find("td input[type=hidden]").val();
        var next_row_formID = $("#basket_table tr." + removeObjID).next("tr:eq(0)").find("td input[type=hidden]").val();
        var divider_tr = '<td colspan="4"><div class="row_divider"></div></td>';
        var prev_tr = $("#basket_table tr." + removeObjID).prev("tr").html();



        //if (prev_tr.includes("row_divider") || prev_row_formID === undefined || ($("#basket_table tr." + removeObjID).prev("tr").attr('class') === undefined)) {
          if (prev_tr.indexOf('row_divider') != -1 || prev_row_formID === undefined || ($("#basket_table tr." + removeObjID).prev("tr").attr('class') === undefined)) {

            //console.log("curernt row form Id is" + current_row_formId + "next row form id is" + next_row_formID);
            if (current_row_formId == next_row_formID) {
                //console.log("Row divider is true - same form Id exists");
                $("#basket_table tr." + removeObjID).next("tr").find('td .vhidden').removeClass('vhidden');
                $("#basket_table tr." + removeObjID + ":eq(0)").remove();
            } else {
                //console.log("Row divider is true - different form Id exists");
                $("#basket_table tr." + removeObjID).remove();

            }

        } else {
            if (prev_row_formID == next_row_formID) {
                //console.log("Row divider false -same form Id exists");
                $("#basket_table tr." + removeObjID + ":eq(0)").remove();
            } else {
                //console.log("Row divider false -different form Id exists");
                prev_tr_class = $("#basket_table tr." + removeObjID).prev("tr").attr('class');
                $("#basket_table tr." + removeObjID + ":eq(0)").next("tr").attr('class', prev_tr_class);
                $("#basket_table tr." + removeObjID + ":eq(0)").remove();
            }

        }


        
       // $("#basket_table tr." + removeObjID).remove(); 



        $('.overlay, .popup').hide(); 
        /* Added by ganthiraj On 02-06-2017 */
        if(JSON.parse(sessionStorage.ObjectSelValue) == "" || JSON.parse(sessionStorage.ObjectSelValue) == null)
        {
            sessionStorage.removeItem("ObjectSelValue"); 
			localStorage.removeItem("alpacaValueIndex");
			localStorage.removeItem("alpacaValue");           
        }
		else if(localStorage.alpacaValueIndex !== undefined)
        {            
			if(JSON.parse(localStorage.alpacaValueIndex) == "" || JSON.parse(localStorage.alpacaValueIndex) == null)
			{
				localStorage.removeItem("alpacaValueIndex");
				localStorage.removeItem("alpacaValue");           
			}
        }
        /* END */
		//console.log(localStorage.ObjectSelValue +"\n\n::"+localStorage.alpacaValueIndex + "\n\n::" +localStorage.alpacaValue) ;
      
    });

  /*  $(document).on("click", "#open_popup", function() {
        $("#popup").css("display", "block");
        $('.overlay').css({
            'height': $(document).height(),
            'width': $(document).width(),
            'display': 'block'
        });
    });*/

  $('#catalog_selectbox, #schema_selectbox, #object_selectbox').prop("selectedIndex", 0);
    

    $("#database_selectbox").change(function() {
       // console.log("db selection");
        $('#catalog_selectbox, #schema_selectbox, #object_selectbox').find("option:gt(0)").remove();
        $(".error_msg_container").hide();
        $("#object_selectbox").removeAttr('style');
        $("#object_selectbox").multiselect( 'unload' );
        $("#object_selectbox").removeAttr("multiple");
        $("#object_selectbox").find('option').remove();
        $('#object_selectbox').append('<option value="option1">-- select --</option>');
    });

    $("#catalog_selectbox").change(function() {
       // console.log("catalog selection");
        $('#schema_selectbox, #object_selectbox').find("option:gt(0)").remove();
        $(".error_msg_container").hide();
        $("#object_selectbox").removeAttr('style');
        $("#object_selectbox").multiselect( 'unload' );
        $("#object_selectbox").removeAttr("multiple");
        $("#object_selectbox").find('option').remove();
        $('#object_selectbox').append('<option value="option1">-- select --</option>');
    });

     $(document).on("click", ".quick_box h2", function() {
            $(this).next(".inner_contents").slideToggle();
            $(this).toggleClass("active");
      });

    
    gettodayDate();

    $(".DataCataglogBtn").click(function() {
		var btnType = $(this).attr('id');
        $("#popup1").css("display", "block");
         document.body.style.overflow = "hidden";
        $('.overlay').css({
                'height': $(document).height(),
                'width': $(document).width(),
                'display': 'block'
        });	
		if(btnType=='btnData'){
			$('#data-serv').css('display', 'block');
			$('#web-serv').css('display', 'none');
			}else{
			$('#data-serv').css('display', 'none');
			$('#web-serv').css('display', 'block');	
				}
        $(".error_msg_container1, .error_msg_container, .error_msg_container2").hide();
        $("#object_selectbox, .ms-options-wrap > button").removeAttr("style");
        $('#catalog_selectbox, #schema_selectbox, #object_selectbox').find("option:gt(0)").remove();
        $("#object_selectbox").multiselect('unload');
        $("#object_selectbox").removeAttr("multiple");
        $("#object_selectbox").find('option').remove();
        $('#object_selectbox').append('<option value="option1">-- select --</option>');
        $('#database_selectbox').prop("selectedIndex", 0);
        $('#catalog_selectbox, #schema_selectbox, #object_selectbox').find("option:gt(0)").remove();
		
		
		$('#path_selectbox, #webService_selectbox, #operation_selectbox').prop("selectedIndex", 0);
		//$('#path_selectbox, #webService_selectbox, #operation_selectbox').append('<option value="option1">-- select --</option>');

      });


    // To show cart count in all the pages
    if(sessionStorage.ObjectSelValue !== undefined && sessionStorage.ObjectSelValue != "")
            {
                local_storage_selVal = sessionStorage.ObjectSelValue;
                local_storage_Object = JSON.parse(local_storage_selVal);
                $(".cartItem_count").html(local_storage_Object.length);
        }


    // Request Detail page 
    $(document).on("click",".request_key",function() {
       var curr_id = $(this).text();
       location.href="DetailPage.html?"+curr_id;
    });

})

function gettodayDate(){
     /* Added by sakthivel on 06-08-2017 for getting current data*/
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd;
        } 
        if(mm<10){
            mm='0'+mm;
        } 
        var today = yyyy+'-'+mm+'-'+dd;
        $('#Requester_date').val(today)
}

// Session manager
// Session Manager - Added 28th June 2017
function maintainSession() {
	var FName = sessionStorage.getItem('FirstName')
	var LName = sessionStorage.getItem('LastName')
	var Upi = sessionStorage.getItem('Upi')
	var Email = sessionStorage.getItem('Email')
	var Unit = sessionStorage.getItem('Unit')
	var userImage = document.getElementById("userImg")

    
    $("#userName").html(FName);
    $('#userImg').attr('src', 'http://zoom.worldbank.org/photo/people/'+Upi+'.jpg');
	
	 
  if (sessionStorage.length){
	   // continue
	  }
  else{
	  alert('You are not logged in. Please click OK to login in.');
	  location.replace(reloginURL);	
	  }
	//console.log(sessionStorage);
}

