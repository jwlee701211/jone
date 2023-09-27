var CON_DOMAIN            = "http://dimeswhm01.doosaninfracore.com";
var CON_DOC_DOMAIN        = "http://diux107.corp.doosan.com:7090";
var CON_RTLS_DOMAIN       = "http://rtls.doosaninfracore.com:7082";
var CON_PORTAL_PATH       = CON_DOMAIN + "/Apriso/Portal/";
var CON_PORTAL_POPUP_PATH = CON_DOMAIN + "/Apriso/Portal/UIService.aspx";
var CON_GPDM_PATH         = CON_DOMAIN + "/GPDM/";
var CON_ENGP_PATH         = CON_DOMAIN + "/ENGP/";

// 설계문서 다운로드시 키값
var CON_ENOVIA_REQUESTER  = "QXByaXNvVXNy";


$(document).ready(function(){
	CON_DOMAIN = "http://"+$(location).attr('host')+"";

	if($(location).attr('host') == "dimeswhm01.doosaninfracore.com"){
		CON_DOC_DOMAIN = "http://diux107.corp.doosan.com:7090";
	}else{
		CON_DOC_DOMAIN = "http://diux103.corp.doosan.com:7081";
	}

    CON_PORTAL_PATH       = CON_DOMAIN + "/Apriso/Portal/";
    CON_PORTAL_POPUP_PATH = CON_DOMAIN + "/Apriso/Portal/UIService.aspx";
    CON_GPDM_PATH         = CON_DOMAIN + "/GPDM/";
	CON_ENGP_PATH         = CON_DOMAIN + "/ENGP/";


	$(".DynamicGrid").each(function(i){
		if(i == 0){
			// 그리드 로드되면 수정 모드 적용 
			$(".DynamicGrid").dgAttachHandler("dataLoaded",Loaded);
		}
	});

});


/**
  * 함 수 명 : dgUpdateCollback
  * 설    명 : 그리드 수정
  * 파라미터 : gridID - 그리드 ID
*/
function dgUpdateCollback(gridID, onErrorF, onSuccesF) {
	dgUpdate(gridID);    
}

/**
  * 함 수 명 : Loaded
  * 설    명 : 그리드 로드되면 수정 모드 적용
*/
function Loaded() {
        var id =$(".DynamicGrid").attr("id");
        $(".DynamicGrid tr[data-key]").each(function(){
               var dataKey=$(this).attr("data-key");
               $(this).find(".edit").each(function(){
                       var value= $(this).val();
                       var field = $(this).closest("td").attr("data-field");
                       var name = id+"~"+dataKey+"~"+field;
                       $("input[name$='"+name+"']").val(value);
               });
               
        });

}

/**
  * 함 수 명 : gfnPopupWipOrder
  * 설    명 : 생산오더상세조회 팝업
  * 파라미터 : sWipOrderNo - 오더번호
  * 참    고 : 사용 예) gfnPopupWipOrder('700004751985')
*/
function gfnPopupWipOrder(sWipOrderNo) {
	if(sWipOrderNo != ""){
		window.open(CON_PORTAL_POPUP_PATH+"?Alias=DI_HV_PP_WIP_ORDER_SCR&EXT_WipOrderNo_SC="+sWipOrderNo, "WinPopWipOrder", "fullscreen=yes,menubar=yes,resizable=yes,status=yes,titlebar=yes,toolbar=yes");
	}
} 

/**
  * 함 수 명 : gfnPopupRework
  * 설    명 : 작명상세조회 팝업
  * 파라미터 : sWipOrderType       - 오더타입
               sNotificationNumber - 작명번호
  * 참    고 : 사용 예) gfnPopupRework('201', 'R50000000252')

*/
function gfnPopupRework(sWipOrderType, sNotificationNumber) {
	var sParams = "";

	if(sWipOrderType != "" && sNotificationNumber != ""){
		if(sWipOrderType == "201"){
			// ERP 작명
			sParams = "?Alias=DI_CO_PP_REWORKSEARCH_DETAIL_SCR&EXT_NotificationNumber="+sNotificationNumber+"&EXT_PopupYn=Y";
		}else if(sWipOrderType == "301"){
			// MES 작명
			sParams = "?Alias=DI_HV_PP_REWORK_LIST_DETAIL_SCR&EXT_NotificationNumber_IN="+sNotificationNumber+"&EXT_PopupYn=Y";
		}
		
		window.open(CON_PORTAL_POPUP_PATH+sParams, "WinPopRework" , "width=1280,height=1000,fullscreen=yes,menubar=yes,resizable=yes,status=yes,titlebar=yes,toolbar=yes");
	}
} 

/**
  * 함 수 명 : gfnOEMPopupWipOrder
  * 설    명 : 생산오더상세조회 팝업
  * 파라미터 : sWipOrderNo - 오더번호
  * 참    고 : 사용 예) gfnPopupWipOrder('700004751985')
*/
function gfnOEMPopupWipOrder(sWipOrderNo) {
	if(sWipOrderNo != ""){
		window.open(CON_PORTAL_POPUP_PATH+"?Alias=DIOEM_HV_PP_WIP_ORDER_SCR&EXT_WipOrderNo_SC="+sWipOrderNo, "WinPopWipOrder", "fullscreen=yes,menubar=yes,resizable=yes,status=yes,titlebar=yes,toolbar=yes");
	}
} 

/**
  * 함 수 명 : gfnOEMPopupRework
  * 설    명 : 작명상세조회 팝업
  * 파라미터 : sWipOrderType       - 오더타입
               sNotificationNumber - 작명번호
  * 참    고 : 사용 예) gfnPopupRework('201', 'R50000000252')

*/
function gfnOEMPopupRework(sWipOrderType, sNotificationNumber) {
	var sParams = "";

	if(sWipOrderType != "" && sNotificationNumber != ""){
		if(sWipOrderType == "201"){
			// ERP 작명
			sParams = "?Alias=DIOEM_CO_PP_REWORKSEARCH_DETAIL_SCR&EXT_NotificationNumber="+sNotificationNumber+"&EXT_PopupYn=Y";
		}else if(sWipOrderType == "301"){
			// MES 작명
			sParams = "?Alias=DIOEM_HV_PP_REWORK_LIST_DETAIL_SCR&EXT_NotificationNumber_IN="+sNotificationNumber+"&EXT_PopupYn=Y";
		}
		
		window.open(CON_PORTAL_POPUP_PATH+sParams, "WinPopRework" , "width=1280,height=1000,fullscreen=yes,menubar=yes,resizable=yes,status=yes,titlebar=yes,toolbar=yes");
	}
} 

/**
  * 함 수 명 : gfnPopup3D
  * 설    명 : 3D 형상 팝업
  * 파라미터 : s3DDocID - 3D 문서 번호
  * 참    고 : 사용 예) gfnPopup3D('100033886')
*/
function gfnPopup3D(s3DDocID) {
	if(s3DDocID != ""){
		window.open(CON_PORTAL_POPUP_PATH+"?Alias=DI_HV_PP_WIP_ORDER_3D_VIEW_SCR&EXT_View_SC="+s3DDocID, "WinPop3D" ,"scrollbars=no,location=no,fullscreen=no,menubar=no,resizable=no,status=no,titlebar=no,toolbar=no,channelmode=yes");
	}
}

/**
  * 함 수 명 : gfnPopupWorkDoc
  * 설    명 : 작표문서 팝업
  * 파라미터 : sSysFlag - 시스템(D : GPDM, E : ENGP)
               sFileUrl - 파일 URL
  * 참    고 : 사용 예) gfnPopup3D('100033886')
*/
// 작표번호클릭시 작표PDF 팝업
function gfnPopupWorkDoc(sSysFlag, sFileUrl) {
	var sFileFullUrl = "";

	if(sSysFlag == "D"){       // GPDM
		sFileFullUrl = CON_GPDM_PATH + sFileUrl;
	}else if(sSysFlag == "E"){ // ENGP
		sFileFullUrl = CON_ENGP_PATH + sFileUrl;
	}else{
	}

    window.open(sFileFullUrl, "WinPopWorkDoc" ,"scrollbars=no,location=no,fullscreen=no,menubar=no,resizable=no,status=no,titlebar=no,toolbar=no,channelmode=yes");
}

/**
  * 함 수 명 : gfnDesignDownload
  * 설    명 : 설계문서 다운로드
  * 파라미터 : sFineName - 파일명
               sFileID   - 파일ID
  * 참    고 : 사용 예) gfnDesignDownload('no_image.png', 1234567890)
*/
function gfnDesignDownload(sFineName, sFileID) {
	var sDownloadUrl = CON_DOC_DOMAIN+"/enovia/common/DIG_MESFileDownload.jsp?objId="+sFileID+"&filename="+sFileID+"&requester="+CON_ENOVIA_REQUESTER;
	var sAgent       = navigator.userAgent.toLowerCase();
	
	if(sAgent.indexOf("msie") != -1 || sAgent.indexOf("trident/7.0") != -1){
		window.open(sDownloadUrl, "WinPopDesignDownload" ,"scrollbars=no,location=no,fullscreen=no,menubar=no,resizable=no,status=no,titlebar=no,toolbar=no,channelmode=yes"); 	  
	}else if(sAgent.indexOf("chrome") != -1){
		$("#_Document").remove();
		$("body").append("<iframe id=\"_Document\" name=\"_Document\" style=\"display:none;\"></iframe>");

		$("#_Document").attr("src", sDownloadUrl);
	}
}


/**
  * 함 수 명 : gfnPopupRtls
  * 설    명 : 차량위치 팝업
  * 파라미터 : oOption - 오더번호
  * 참    고 : 사용 예) gfnPopupRtls({RFIDTAGNO 		: 태그ID
									 ,MODELCODE			: 기종코드
									 ,DOMESTICEXPORT	: 내수/수출
									 ,WIPORDERTYPE		: 오더넘버
									 ,SERIALNO			: 호기
									 ,PRODUCTNO			: 대표사양넘버
									 ,SEQUENCENO		: 연번
									 ,PRODUCTNAME		: 대표사양
									 ,COUNTRYNAME		: 판매국가
									 ,'WIPORDERNO' : '700004751985' // WIPORDERNO : 오더번호 
									 ,MODELNAME		기종명})
*/
function gfnPopupRtls(oOption) {
	var sParams = "";

	if(oOption != null && oOption != "" && oOption != undefined){
		sParams = "?";
		if(oOption.RFIDTAGNO != "" && oOption.RFIDTAGNO != undefined){
			sParams+= sParams.length > 1 ? "&RFIDTAGNO="+oOption.RFIDTAGNO : "RFIDTAGNO="+oOption.RFIDTAGNO;
		}
		if(oOption.MODELCODE != "" && oOption.MODELCODE != undefined){
			sParams+= sParams.length > 1 ? "&MODELCODE="+oOption.MODELCODE : "MODELCODE="+oOption.MODELCODE;
		}
		if(oOption.DOMESTICEXPORT != "" && oOption.DOMESTICEXPORT != undefined){
			sParams+= sParams.length > 1 ? "&DOMESTICEXPORT="+oOption.DOMESTICEXPORT : "DOMESTICEXPORT="+oOption.DOMESTICEXPORT;
		}
		if(oOption.WIPORDERTYPE != "" && oOption.WIPORDERTYPE != undefined){
			sParams+= sParams.length > 1 ? "&WIPORDERTYPE="+oOption.WIPORDERTYPE : "WIPORDERTYPE="+oOption.WIPORDERTYPE;
		}
		if(oOption.SERIALNO != "" && oOption.SERIALNO != undefined){
			sParams+= sParams.length > 1 ? "&SERIALNO="+oOption.SERIALNO : "SERIALNO="+oOption.SERIALNO;
		}
		if(oOption.PRODUCTNO != "" && oOption.PRODUCTNO != undefined){
			sParams+= sParams.length > 1 ? "&PRODUCTNO="+oOption.PRODUCTNO : "PRODUCTNO="+oOption.PRODUCTNO;
		}
		if(oOption.SEQUENCENO != "" && oOption.SEQUENCENO != undefined){
			sParams+= sParams.length > 1 ? "&SEQUENCENO="+oOption.SEQUENCENO : "SEQUENCENO="+oOption.SEQUENCENO;
		}
		if(oOption.PRODUCTNAME != "" && oOption.PRODUCTNAME != undefined){
			sParams+= sParams.length > 1 ? "&PRODUCTNAME="+oOption.PRODUCTNAME : "PRODUCTNAME="+oOption.PRODUCTNAME;
		}
		if(oOption.COUNTRYNAME != "" && oOption.COUNTRYNAME != undefined){
			sParams+= sParams.length > 1 ? "&COUNTRYNAME="+oOption.COUNTRYNAME : "COUNTRYNAME="+oOption.COUNTRYNAME;
		}
		if(oOption.WIPORDERNO != "" && oOption.WIPORDERNO != undefined){
			sParams+= sParams.length > 1 ? "&WIPORDERNO="+oOption.WIPORDERNO : "WIPORDERNO="+oOption.WIPORDERNO;
		}
		if(oOption.MODELNAME != "" && oOption.MODELNAME != undefined){
			sParams+= sParams.length > 1 ? "&MODELNAME="+oOption.MODELNAME : "MODELNAME="+oOption.MODELNAME;
		}
	}

	window.open(CON_RTLS_DOMAIN+"/geospace/monitoring/map"+sParams, "WinPopRtls", "fullscreen=yes,menubar=yes,resizable=yes,status=yes,titlebar=yes,toolbar=yes");
}

/**
  * 함 수 명 : useConfirmModal
  * 설    명 : ConfirmModal HTML div 추가
  * 파라미터 : BodyText - ConfirmMessage
  * 참    고 : 사용 예) useConfirmModal("생성 하시겠습니까?")
  * 생 성 자 : 박태준 대리 
*/
function useConfirmModal(BodyWidth, BodyText) {

var sWidth = BodyWidth;

if (BodyWidth == "" || BodyWidth == undefined) {
	sWidth	= "300";
}
sWidth	= sWidth + "px";

var sHtml	= "<div class='modal fade myModal' tabindex='-1' role='dialog' style='display:none'>"
			+ "	<div class='modal-dialog' style='width:"+ sWidth +"'>"
			+ "		<div class='modal-content'>"
			+ "			<div class='modal-header'>"
			+ "				<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
			+ "				<span class='modal-title' id='myModalLabel'>Confirm</span>"
			+ "			</div>"
			+ "			<div class='modal-body'>"
			+ "				<h4>"+ BodyText +"</h4>"
			+ "			</div>"
			+ "			<div class='modal-footer'>"
			+ "				<button type='button' class='btn btn-default Primary confirmOk' data-dismiss='modal' >확인</button>"
			+ "				<button type='button' class='btn btn-default confirmCancle' data-dismiss='modal'>취소</button>"
			+ "			</div>"
			+ "		</div>"
			+ "	</div>"
		 	;
$('.myModal').remove();
$("#Portal").append(sHtml);
}

/**
  * 함 수 명 : confirmModal
  * 설    명 : ConfirmModal Function
  * 파라미터 : callback - confirm
  * 참    고 : 사용 예) confirmModal(300, "완료 하시겠습니까?", function(confirm){
						if(confirm){
							alert("완료하였습니다.");	
						}
					});
  * 생 성 자 : 박태준 대리 
*/
function confirmModal(BodyWidth, BodyText, callback){

	useConfirmModal(BodyWidth, BodyText);

	modalConfirm(function(confirm){
		callback(confirm);
	});	
	
}

var modalConfirm = function (callback){
	
	$(".myModal").modal("show");

	$(".confirmOk").on("click", function(){
		callback(true);
		$(".myModal").modal('hide');
	});
	
	$(".confirmCancle").on("click", function(){
		callback(false);
		$(".myModal").modal('hide');
	});
};

/**
  * 함 수 명 : gfnPopupManual
  * 설    명 : 메뉴얼 팝업
  * 파라미터 : sFileUrl - 파일 URL
  * 참    고 : 사용 예) gfnPopupManual('PP1104-오더접수및조회')
*/
function gfnPopupManual(sFileUrl) {
	var sFileFullUrl = CON_DOMAIN + sFileUrl;

	if(sFileUrl != ""){
	    window.open(sFileFullUrl, "WinPopManual" ,"scrollbars=no,location=no,fullscreen=yes,menubar=no,resizable=no,status=no,titlebar=no,toolbar=no,channelmode=yes");
	}
}

/**  2020-04-27 추가 이정원부장
  * 함 수 명 : gfnSelectBoxClear
  * 설    명 : SELECT BOX Clear
  * 파라미터 : oSelect - 오브젝트
  * 참    고 : 사용 예) gfnSelectBoxClear($(".Control.fc_EXT_Facility_SC select"))
*/
function gfnSelectBoxClear(oSelect) {
        oSelect.html("");
} 
/**
  * 함 수 명 : gfnSetSelectBox
  * 설    명 : SELECT BOX 셋팅
  * 파라미터 : oSelect - SELECT BOX 오브젝트
  *            aJsonData - AJAX 결과 데이터
  *            sSelectVal - Select될 값
  *            sAddAttribute - Attribute 추가될 내용
  * 참    고 : 사용 예) gfnSetSelectBox($(".Control.fc_EXT_ProductionLineNo_SC select"), outputs, "")
*/
function gfnSetSelectBox(oSelect, aJsonData, sSelectVal, sAddAttribute){
    var aCodeList    = aJsonData.EXT_CodeList;                  
    var aNameList    = aJsonData.EXT_NameList;
    var sSearchAllYn = "Y";

    if(aJsonData.EXT_SearchAllYn == "N") sSearchAllYn = "N";

    // SELECT BOX Clear
    gfnSelectBoxClear(oSelect);
    if(aCodeList.length > 0){
        
        for (i = 0; i < aCodeList.length; i++){ 
            oSelect.append("<option "+sAddAttribute+" value='" + jQuery.trim(aCodeList[i]) + "'>" + jQuery.trim(aNameList[i]) + "</option>");    
        }

		if(sSearchAllYn == "Y"){
			if(sAddAttribute == ""){
                oSelect.append("<option value=''>--</option>");
			}else{
                oSelect.append("<option "+sAddAttribute+" value=''>--</option>");
			}
		}

        oSelect.val(sSelectVal);       
    }

    // SELECT BOX Value 적용
    oSelect.change();
}


/**
  * 함 수 명 : gfnGridDeselectAll
  * 설    명 : 그리드 행선택 해제
  * 파라미터 : CON_GRID - 전역변수로 선언
  * 참    고 : 사용 예) CON_GRID.dgAttachHandler("dataLoaded",gfnGridDeselectAll);
*/
function gfnGridDeselectAll(){
    var oGrid;
        
        //console.log('CON_GRID + ' + CON_GRID);
        if(CON_GRID == undefined){
               $('.BusinessControlContainer').each(function(idx){
                   oGrid = $(this);
                       oGrid.find(".DynamicGrid tr").each(function(idx, row){
                              if($(this).attr("class") == "selected"){
                                      oGrid.dgToggleSelect(row, false);
                              }
                       });     
               });
        }else{
               CON_GRID.find("tr").each(function(idx, row){
                       if($(this).attr("class") == "selected"){
                              CON_GRID.dgToggleSelect(row, false);
                       }
               });     
        }       
}

/**
  * 함 수 명 : gfnBasicPcTimer
  * 설    명 : 현황판의 기본 타이머
  * 파라미터 : 
  * 참    고 : 사용 예) gfnBasicPcTimer();
*/
function gfnBasicPcTimer(){
    gfnSetPcTimer("Date", "Time");
}

/**
  * 함 수 명 : gfnSetPcTimer
  * 설    명 : 현황판의 타이머
  * 파라미터 : sDateName - 날짜 오브젝트 ID
  *            sTimeName - 시간 오브젝트 ID
  * 참    고 : 사용 예) gfnSetPcTimer("Date", "Time");
*/
function gfnSetPcTimer(sDateName, sTimeName){
    // 타이머 
    var PcTimer = setInterval(function() { 
        var d           = new Date();
        var Year        = d.getFullYear();
        var Month       = d.getMonth()+1;
        var Day         = d.getDate();
        var hours       = d.getHours();
        var minutes     = d.getMinutes();
        var seconds     = d.getSeconds();
        var CurrentDate = "";
        var CurrentTime = "";
        
        if(Month < 10) Month = "0" + Month;
        if(Day < 10) Day = "0" + Day;

        CurrentDate = Year + "-" + Month + "-" + Day;

        if(hours < 10) hours = "0"+hours;
        if(minutes<10) minutes = "0"+minutes;
        if(seconds<10) seconds = "0"+seconds;

        CurrentTime = hours + ":" + minutes + ":" + seconds;

        document.getElementById(sDateName).innerHTML = CurrentDate;
        document.getElementById(sTimeName).innerHTML = CurrentTime;
    }, 1000);
}

/**
  * 함 수 명 : gfnSetFrameFixed
  * 설    명 : 틀고정 - 그리드사용
  * 파라미터 : objGrid - 그리드 오브젝트
  *          colFrom - 시작 컬럼수
  *          colTo   - 종료 컬럼수
  *          jsonOption - JSON 타입의 옵션들
  * 참    고 : 
  *          사용 예) gfnSetFrameFixed($(".DynamicGrid.AllocResultGrid"), 3, jsonOption);
*/
function gfnSetFrameFixed(objGrid, colFrom, colTo, jsonOption){
	var objScroll = objGrid.find(".Container.vpBody");
	
	// 틀고정 : 제목 소스 삭제
	objGrid.find(".vpHead.Top").find(".FixedHeadBox").each(function(i){
		$(this).remove();
	});
	// 틀고정 : 내용 소스 삭제
	objGrid.find(".Container.vpBody").find(".FixedBodyBox").each(function(i){
		$(this).remove();
	});
	
	gfnSetFrameFixedHead(objGrid, colFrom, colTo, jsonOption); 	// 틀고정 : 제목
	gfnSetFrameFixedBody(objGrid, colFrom, colTo, jsonOption); 	// 틀고정 : 내용
	gfnSetFrameFixedScroll(objScroll);							// 틀고정 : 스크롤
}
/**
  * 함 수 명 : gfnSetFrameFixedHead
  * 설    명 : 틀고정 : 제목
  * 파라미터 : objGrid - 그리드 오브젝트
  *          colFrom - 시작 컬럼수
  *          colTo   - 종료 컬럼수
  *          jsonOption - JSON 타입의 옵션들
  * 참    고 : 
  *          사용 예) gfnSetFrameFixedHead($(".DynamicGrid.AllocResultGrid"), 3, jsonOption);
*/
function gfnSetFrameFixedHead(objGrid, colFrom, colTo, jsonOption){
	var sHtml          = "";
	var sWidth         = "";
	var sHeight        = "";
	var headDivStyle   = (jsonOption.headDivStyle == null || jsonOption.headDivStyle == "" || jsonOption.headDivStyle == undefined) 
							? "position:absolute;top:31px;left:1px;overflow:visible;":jsonOption.headDivStyle;
	var headTableStyle = (jsonOption.headTableStyle == null || jsonOption.headTableStyle == "" || jsonOption.headTableStyle == undefined)
							? "position:absolute;top:1px;left:1px;":jsonOption.headTableStyle;
	var headTdStyle    = (jsonOption.headTdStyle == null || jsonOption.headTdStyle == "" || jsonOption.headTdStyle == undefined)
							? "background-color:#E2E4E3;":jsonOption.headTdStyle;
	var titleDisplayYn = (jsonOption.titleDisplayYn == null || jsonOption.titleDisplayYn == "" || jsonOption.titleDisplayYn == undefined)
							? "Y":jsonOption.titleDisplayYn;

	//-------------------------- 틀고정 제목(시작) -----------------------------------//	
	sHtml+= '<div class="FixedHeadBox" style="'+headDivStyle+'">';	
	sHtml+= '<table style="'+headTableStyle+'">';
	sHtml+= '	<thead>';
	objGrid.find(".vpHead.Top").find("tr").each(function(i){	
	sHtml+= '		<tr>';
		$(this).find("td").each(function(j){
			sWidth  = $(this).width();
			sHeight = $(this).height();
			if(j >= colFrom && j <= colTo){
				if(titleDisplayYn == "Y") sHtml+= '<td align="center" style="'+headTdStyle+';width:'+sWidth+'px;height:'+sHeight+'px;">'+$(this).html()+'</td>';
				else sHtml+= '<td align="center" style="'+headTdStyle+';width:'+sWidth+'px;height:'+sHeight+'px;"></td>'; //#BCBCBC
			}	
		});	
	sHtml+= '		</tr>';	
	});	
	sHtml+= '	</thead>';
	sHtml+= '</table>';
	sHtml+= '</div>';

	objGrid.find(".vpHead.Top").find("table").each(function(j){
		if(j > 1) $(this).remove();
	});
	
	objGrid.find(".vpHead.Top").append(sHtml);
	//-------------------------- 틀고정 제목(종료) -----------------------------------//	
}
/**
  * 함 수 명 : gfnSetFrameFixedBody
  * 설    명 : 틀고정 : 내용
  * 파라미터 : objGrid - 그리드 오브젝트
  *          colFrom - 시작 컬럼수
  *          colTo   - 종료 컬럼수
  *          jsonOption - JSON 타입의 옵션들
  * 참    고 : 
  *          사용 예) gfnSetFrameFixedBody($(".DynamicGrid.AllocResultGrid"), 3, jsonOption);
*/
function gfnSetFrameFixedBody(objGrid, colFrom, colTo, jsonOption){ 
	var sHtml          = "";
	var sStyle         = "";
	var sWidth         = "";
	var sHeight        = "";
	var sClass         = "";
	var sDataClass     = "";
	var sRowMaxHeight  = 0;
	var sTableHeight   = "";
	var bodyDivStyle   = (jsonOption.bodyDivStyle == null || jsonOption.bodyDivStyle == "" || jsonOption.bodyDivStyle == undefined)
							? "position:absolute;top:62px;left:1px;overflow:hidden;":jsonOption.bodyDivStyle;
	var bodyTableStyle = (jsonOption.bodyTableStyle == null || jsonOption.bodyTableStyle == "" || jsonOption.bodyTableStyle == undefined)
							? "position:absolute;top:1px;left:1px;":jsonOption.bodyTableStyle;
	// 2022-10-18 jeongwon.lee 정렬코드가 있는 경우(시작)							
	var sBodyAlign     = (jsonOption.bodyAlign == null || jsonOption.bodyAlign == "" || jsonOption.bodyAlign == undefined)
							? "":jsonOption.bodyAlign;
	var iBodyAlignLength = 0;
	var aBodyAlign;
	
	if(sBodyAlign == ""){
		sBodyAlign       = "center";
		iBodyAlignLength = 0;
	} else {
		aBodyAlign       = sBodyAlign.split(";");
		iBodyAlignLength = aBodyAlign.length;
	}
	// 2022-10-18 jeongwon.lee 정렬코드가 있는 경우(종료)

	//-------------------------- 틀고정 내용(시작) -----------------------------------//
	objGrid.find("tbody").find("tr").each(function(i){
		sRowMaxHeight = sRowMaxHeight < parseInt($(this).height()) ? parseInt($(this).height()) : sRowMaxHeight;
	});	
	//console.log("########### FixedBodyBox ##############");
	sHtml+= '<div class="FixedBodyBox" style="'+bodyDivStyle+'">';
	sHtml+= '<table class="FixedTable" style="'+bodyTableStyle+'">';
	sHtml+= '	<tbody>';
	objGrid.find("tbody").find("tr").each(function(i){
		if(i == 0){
			// 숨겨진 Row : 더미 
		    sHtml+= '<tr class="Dummy">';
			$(this).find("td").each(function(j){
				// 2022-10-18 jeongwon.lee 정렬코드가 있는 경우
				if(iBodyAlignLength > 0) sBodyAlign = aBodyAlign[i];
				sWidth     = $(this).width();
				sHeight    = $(this).height();
				sClass     = $(this).prop("class");
				sDataClass = $(this).prop("data-class");
	
				if(j >= colFrom && j <= colTo) sHtml+= '<td class="'+sClass+'" align="'+sBodyAlign+'" style="width:'+sWidth+'px;height:'+sHeight+'px;"></td>';
			});
			sHtml+= '</tr>';		
		}else{
			// 틀고정 Row의 height 동일하게 적용
			$(this).attr("style", "height:"+sRowMaxHeight+"px;");
		    sHtml+= '<tr style="height:'+sRowMaxHeight+'px;">';
			$(this).find("td").each(function(j){
				// 2022-10-18 jeongwon.lee 정렬코드가 있는 경우
				if(iBodyAlignLength > 0) sBodyAlign = aBodyAlign[i];			
				sWidth     = $(this).width();
				sHeight    = $(this).height();
				sClass     = $(this).prop("class");
				sDataClass = $(this).prop("data-class");				
				if(j >= colFrom && j <= colTo) sHtml+= '<td class="'+sClass+'" align="'+sBodyAlign+'" style="width:'+sWidth+'px;height:'+sHeight+'px;">'+$(this).html()+'</td>';
			});
			sHtml+= '</tr>';
		}
	});	
	sHtml+= '	</tbody>'; 
	sHtml+= '</table>';
	sHtml+= '</div>'; 
	
	objGrid.find(".Container.vpBody").find("table").each(function(k){
		if(k == 0) sTableHeight = $(this).height();
	});
	
	objGrid.find(".Container.vpBody").append(sHtml);
	//-------------------------- 틀고정 내용(종료) -----------------------------------//
	
	//-------------------------- 틀고정 사이즈 조정(시작) -----------------------------------//
	sWidth  = objGrid.find(".FixedTable").width() + 6; // 패딩 값 보정 : 6
	sHeight = objGrid.find(".Container.vpBody").height();
	//console.log('0 : sTableHeight + ' + sTableHeight + ', sHeight + ' + sHeight);
	
	// 그리드와 테이블의 높이 비교 : 틀고정 높이 보정
	if(parseInt(sTableHeight) > parseInt(sHeight)){	
		sHeight = parseInt(sHeight) - 18; // 높이를 스크롤 바 만큼 뺀다.
	}
	
	//console.log('1 : sWidth + ' + sWidth + ', sHeight + ' + sHeight);
	sStyle = objGrid.find(".FixedBodyBox").attr("style");
	sStyle+="width:"+sWidth+"px;height:"+sHeight+"px;";
	
	objGrid.find(".FixedBodyBox").attr("style", sStyle);
	//-------------------------- 틀고정 사이즈 조정(종료) -----------------------------------//
}
/**
  * 함 수 명 : gfnSetFrameFixedScroll
  * 설    명 : 틀고정 : 스크롤
  * 파라미터 : objScroll - 스크롤
  * 참    고 : 
  *          사용 예) gfnSetFrameFixedScroll($(".DynamicGrid.AllocPriorityMappGrid .Container.vpBody"));
*/
function gfnSetFrameFixedScroll(objScroll){ 
	objScroll.scroll(function(){
		objScroll.find(".FixedTable").css("top", 0 - $(this).scrollTop());
	});
}