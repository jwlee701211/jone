<div class="ToastUI-MainView">
	<div class="ToastUI-Container">
		<div class="ToastUI-ButtonGroup">
			<button type="button" onclick="gfnTuiExcelExport(TOAST_GRID, GRID_GROUP)" class="Button ExcelExport"><i class="fa fa-download" aria-hidden="true" style="font-weight:bold;"></i></button>
			<button type="button" onclick="gfnTuiFilterClear(TOAST_GRID, GRID_GROUP)" class="Button FilterClear">{@DI_COL_FilterClear:text}<i class="fa fa-magic" aria-hidden="true" style="font-weight:bold;"></i></button>
		</div>
		<div class="ToastUI-GridGroup">
			<div id="InventoryBalanceList" class="tuiGrid InventoryBalanceList Active"></div>
		</div>
	</div>
</div>
<script>
let BODY_CONTEXT = $Context;
let btnSearch    = document.querySelector('.Control.fc_BTN_Search button');

//gfnAprisoKeydownUnbind();
let FormButton = document.querySelectorAll('.DIOEM_HV_MM_INVENTORY_BALANCE_FORM_VIEW .FormContainer button');
if(FormButton && FormButton.length > 0){
	FormButton.forEach((button) => { button.removeAttribute('onclick') })
}
</script>

//###############################################################################################################//
//###############################################################################################################//
//###############################################################################################################//
//###############################################################################################################//
//###############################################################################################################//

// ready
$(document).ready(function(){
	// 공통 버튼 설정
	CONT_BUTTON_CONFIG = {btnComSearch : true, btnComInventoryBalance : false, btnComInventoryMaster : true, btnComMaterialMaster : true, btnComInventoryPO : true};
	
	// 화면 그리드 설정
	REQUEST_CODE = "DIOEM_HV_MM_INVENTORY_BALANCE_SCR";
	TOAST_GRID   = {InventoryBalanceList : gfnToastGrid('InventoryBalanceList', null, "rowNum")};
	HEADER_COUNT = Object.keys(TOAST_GRID).length;
	ROW_COUNT    = Object.keys(TOAST_GRID).length;
	GRID_GROUP   = document.querySelector('.ToastUI-Container .ToastUI-GridGroup');

	// 공통 Button 셋팅
	gfnSetComButton();

	// 그리드 헤더 요청
	fnHeaderRequest();
});

//이벤트 처리
document.addEventListener('readystatechange', (event) => {
    if (event.target.readyState == 'interactive') {
		// 조회 버튼 클릭시 
		if(btnSearch){
			btnSearch.addEventListener('click', fnSearch, false);
		}
	}
})

// 조회
function fnSearch(){
	if(fnVaildCheck()){
		$('.loadingLayer').show();
		
		// 재고Balance 정보 조회 Ajax	
		fnGetInventoryBalanceInfo();
		
		// 재고Balance 목록 요청 
		fnRowRequest();
	}
}

// 조회조건 체크
function fnVaildCheck(){
	// 조회조건 체크
	if(!gProductNo.value){
		alert(BODY_CONTEXT.literals.DI_ERR_ProductNo);
		gProductNo.focus();
		return false;
	}
	return true;
}

// [화면] Toast Grid Header 요청
async function fnHeaderRequest(){	
	$('.loadingLayer').show();
	
	const headRequest = await Promise.allSettled([
        gfnRequestGridData(gfnSetSearchConditions("HEADER", "InventoryBalanceList"), gfnSetGridHeader),
		
    ]);
}

// [화면] Toast Grid Data 요청
async function fnRowRequest(){
	$('.loadingLayer').show();
	
	const rowRequest = await Promise.allSettled([
		gfnRequestGridData(gfnSetSearchConditions("ROW", "InventoryBalanceList"), gfnSetGridRow, fnPositiveQtyClassApply),
	]);
}

// 2023-09-21, Kim CheolEon : 수량 양수일 경우 표시 (전왕 책임 요청)
function fnPositiveQtyClassApply(tuiObj, jsonDdata)
{
	let grid = tuiObj;
	
	if(grid)
	{
		let gridData = grid.getData();
		if(gridData.length > 0)
		{
			for(let row of gridData)
			{
				rowKey = parseInt(row.rowKey);
				
				if(rowKey == 0) continue; //첫번째 집계행 제외
				
				qty = parseInt(row.RequiredQty);
				if(!Number.isNaN(qty) && qty > 0)
				{
					grid.addRowClassName(rowKey, 'bgColLightBlue');
				}
				else
				{
					grid.removeRowClassName(rowKey, 'bgColLightBlue');
				}
			}
		}
	}
}


// 재고Balance 정보 조회 Ajax
function fnGetInventoryBalanceInfo(){
    var inputs = {};
	inputs.EXT_Facility_SC  = gFacility  ? gFacility.value  : "";
	inputs.EXT_ProductNo_SC = gProductNo ? gProductNo.value : "";
	
	//console.log("fnGetInventoryBalanceInfo ::: inputs ===> " + JSON.stringify(inputs));	
    BODY_CONTEXT.callOperation('DIOEM_HV_MM_GET_INVENTORY_BALANCE_INFO_OPR', inputs,
        function(outputs){ 
			//console.log("fnGetInventoryBalanceInfo ::: outputs ===> " + JSON.stringify(outputs));
			if(outputs){
				$(".Control.fc_EXT_ProductPurchaseLargeName input").val(outputs.EXT_ProductPurchaseLargeName);
				$(".Control.fc_EXT_CurrentStock input").val(outputs.EXT_CurrentStock);
				$(".Control.fc_EXT_RegularReservationInstructionQty input").val(outputs.EXT_RegularReservationInstructionQty);
				$(".Control.fc_EXT_ProductSupplyName input").val(outputs.EXT_ProductSupplyName);
				$(".Control.fc_EXT_PurchaseRequiredQty input").val(outputs.EXT_PurchaseRequiredQty);
				$(".Control.fc_EXT_PreStockQty input").val(outputs.EXT_PreStockQty);
				$(".Control.fc_EXT_ProcurementName input").val(outputs.EXT_ProcurementName);
				$(".Control.fc_EXT_SafetyStockQty input").val(outputs.EXT_SafetyStockQty);
				$(".Control.fc_EXT_ExceptionReservationInstructionQty input").val(outputs.EXT_ExceptionReservationInstructionQty);
				$(".Control.fc_EXT_PurchaseOrderQty input").val(outputs.EXT_PurchaseOrderQty);
				$(".Control.fc_EXT_ERPInventoryQty input").val(outputs.EXT_ERPInventoryQty);
				$(".Control.fc_EXT_PlanController input").val(outputs.EXT_PlanController);
				$(".Control.fc_EXT_EndLineInventoryQty input").val(outputs.EXT_EndLineInventoryQty);
				$(".Control.fc_EXT_TotDefectQty input").val(outputs.EXT_TotDefectQty);
				$(".Control.fc_EXT_PurchaseTypeName input").val(outputs.EXT_PurchaseTypeName);
			}else{
				$(".Control.fc_EXT_ProductPurchaseLargeName input").val("");
				$(".Control.fc_EXT_CurrentStock input").val("");
				$(".Control.fc_EXT_RegularReservationInstructionQty input").val("");
				$(".Control.fc_EXT_ProductSupplyName input").val("");
				$(".Control.fc_EXT_PurchaseRequiredQty input").val("");
				$(".Control.fc_EXT_PreStockQty input").val("");
				$(".Control.fc_EXT_ProcurementName input").val("");
				$(".Control.fc_EXT_SafetyStockQty input").val("");
				$(".Control.fc_EXT_ExceptionReservationInstructionQty input").val("");
				$(".Control.fc_EXT_PurchaseOrderQty input").val("");
				$(".Control.fc_EXT_ERPInventoryQty input").val("");
				$(".Control.fc_EXT_PlanController input").val("");
				$(".Control.fc_EXT_EndLineInventoryQty input").val("");
				$(".Control.fc_EXT_TotDefectQty input").val("");
				$(".Control.fc_EXT_PurchaseTypeName input").val("");	
			}	
        },
        function(message) {
            alert(message);
        });
}
//###############################################################################################################//
//###############################################################################################################//
//###############################################################################################################//
//###############################################################################################################//
//###############################################################################################################//

<div class="ToastUI-MainView">
	<div class="ToastUI-Container">
		<div class="ToastUI-ButtonGroup">
			<div class="ToastUI-SubGroup Left">
				<button type="button" onclick="fnPickingBarcodeRequest()" class="Button fa fa-search">{@DI_COL_DetailSearch:text}</button>
			</div>
			<div class="ToastUI-SubGroup Middle">
				<!-- -->
			</div>
			<div class="ToastUI-SubGroup Right">
				{? PickingRole == true ? <button type="button" onclick="fnRePicking();" class="Button RePicking fa fa-retweet">{@DI_COL_RegeneratePicking:text}</button> : ?}
				<button type="button" onclick="fnPickingBarcodeExcelExport()" class="Button ExcelExport fa fa-download"></button>
				<button type="button" onclick="gfnTuiFilterClear(TOAST_GRID, GRID_GROUP)" class="Button FilterClear fa fa-magic"></button>
			</div>
		</div>
		<div class="ToastUI-GridGroup">
			<div class="ToastUI-SubGroup Left">
				<div id="PickingOrderList" class="tuiGrid PickingOrderList Active"></div>
			</div>
			<div class="ToastUI-SubGroup Middle">
				<div id="PickingWorkCenterList" class="tuiGrid PickingWorkCenterList Active"></div>
			</div>
			<div class="ToastUI-SubGroup Right">
				<div id="PickingBarcodeList" class="tuiGrid PickingBarcodeList Active"></div>
			</div>
		</div>
	</div>
</div>

<template>
{@DI_ERR_PickingOrderSelectRequired:text}
{@DI_TITLE_Confirmation:text}
{@DI_MNT_IncompleteAlertMessage:text}
{@DI_ERR_EntryNO:text}
{@DI_ERR_PickingDetailSearchNotEqual:text}
{@DIOEM_HV_MM_PICKING_GRID_VIEW:text}
{@DI_COL_ConfirmRegeneratePickingOrder:text}
{@DI_ERR_SELECT_DATA:text}
</template>

<script>
let BODY_CONTEXT  = $Context;

//2023-09-06, Kim CheolEon : Apriso Simple conditionals 로 변경
//$(document).ready(function(){
//	let btnRegeneratePicking = BODY_CONTEXT.literals.DI_COL_RegeneratePicking;
//
//	// 피킹 권한 소유자에게만 버튼이 활성화됨
//	if(BODY_CONTEXT.inputs.PickingRole){
//		$(".ToastUI-ButtonGroup").prepend('<button type="button" onclick="fnRePicking();" class="Button RePicking fa fa-retweet" style="font-weight: bold;"> '+btnRegeneratePicking+'</button>');
//	}
//});
</script>

//###############################################################################################################//
//###############################################################################################################//
//###############################################################################################################//
//###############################################################################################################//
//###############################################################################################################//

var REQUEST_CODE  = "DIOEM_HV_MM_PICKING_SCR";
var TOAST_GRID   = {
	                 PickingOrderList   : gfnToastGrid('PickingOrderList',   null, "checkbox") // checkbox
	               , PickingWorkCenterList : gfnToastGrid('PickingWorkCenterList', null, "checkbox")
				   , PickingBarcodeList : gfnToastGrid('PickingBarcodeList', null, "rowNum")
				   };
var GRID_GROUP    = document.querySelector('.ToastUI-Container .ToastUI-GridGroup');
var SEARCH_BUTTON = document.querySelector('.Control.fc_BTN_Search button');

let FormButton = document.querySelectorAll('.DIOEM_HV_MM_PICKING_FORM_VIEW .FormContainer button');
if(FormButton && FormButton.length > 0){
	FormButton.forEach((button) => { button.removeAttribute('onclick') })
}


/* ToastGrid 할당 변수 */
let sGrid = TOAST_GRID["PickingOrderList"];
let wGrid = TOAST_GRID["PickingWorkCenterList"];
let tGrid = TOAST_GRID["PickingBarcodeList"];
let dschWipOrderNoList = [];

//let PCKING_BARCODE_CONDITIONS = null;

// 화면 진입 후 DOM 준비 시 시행 이벤트
document.addEventListener('readystatechange', (event) => {
    if (event.target.readyState == 'interactive') {
		// 공통 버튼 설정
		CONT_BUTTON_CONFIG = {btnComSearch : true, btnComInventoryBalance : true, btnComInventoryMaster : true, btnComMaterialMaster : true, btnComInventoryPO : true};
		
		// 조회 버튼 클릭 이벤트 발생시 
		if(SEARCH_BUTTON) {
			SEARCH_BUTTON.addEventListener('click', fnRowRequest) ;
		}

		// [병행]Toast Grid Header 요청
		gfnConcurrencyRequest([
			  gfnRequestGridData(gfnSetSearchConditions("HEADER", "PickingOrderList"),       gfnSetGridHeader)
			, gfnRequestGridData(gfnSetSearchConditions("HEADER", "PickingWorkCenterList"),  gfnSetGridHeader)
			, gfnRequestGridData(gfnSetSearchConditions("HEADER", "PickingBarcodeList"),     gfnSetGridHeader)
		], "HEADER") ;
	}
})


// [화면] Toast Grid Data 요청
// 최상단 조회조건을 통한 조회는, WipOrderNo 에 대한 1차 조회.
async function fnRowRequest(){
	$('.loadingLayer').show();
	
    gfnConcurrencyRequest([
         gfnRequestGridData(gfnSetSearchConditions("ROW", "PickingOrderList"),   gfnSetGridRow, fnOrderStatusClassApply)
	], "ROW") ;
}


// [화면] Toast Grid Data 요청2
// 상세조회는, 선택된 WipOrderNo 를 통해 => 작업장, 피킹바코드 목록을 2차 조회
function fnPickingBarcodeRequest()
{
	chkOrderList = sGrid ? sGrid.getCheckedRows() : [];
	
	if(chkOrderList.length > 0)
	{	
		let wiporderList = chkOrderList.map(item => item.WipOrderNo);
		//2023-09-18, Kim CheolEon 상세조회 시 선택된 WipOrderNo 임시저장
		dschWipOrderNoList = wiporderList;
		
		//피킹바코드 조회옵션 - 재정의
		let searchB = gfnSetSearchConditions("ROW", "PickingBarcodeList");
		let searchB_JSON = JSON.parse(searchB.EXT_SearchConditionJSON)
		searchB_JSON.WipOrderNoText = wiporderList.join(',');
		
		searchB.EXT_SearchConditionJSON = JSON.stringify(searchB_JSON);

		
		//작업장 조회옵션 - 재정의
		let searchW = gfnSetSearchConditions("ROW", "PickingWorkCenterList");
		let searchW_JSON = JSON.parse(searchW.EXT_SearchConditionJSON);
		searchW_JSON.WipOrderNoText = wiporderList.join(',');
		
		searchW.EXT_SearchConditionJSON = JSON.stringify(searchW_JSON);
		
		
		$('.loadingLayer').show();
		
		gfnConcurrencyRequest([
	         gfnRequestGridData(searchB, gfnSetGridRow, fnBarcodeStatusClassApply)
	        ,gfnRequestGridData(searchW, gfnSetGridRow, fnSaveWorkCenterList)
		], "ROW") ;
	}
	else
	{
		gfnShowSnackBar('error', BODY_CONTEXT.literals.DI_ERR_PickingOrderSelectRequired);
	}
}



/* *********************************************************************************************
	2023-09-05, Kim CheolEon : PickingOrderWorkCenter 추가
		1. 오더 선택 시, 작업장 목록 갱신.
		2. 작업장 선택 시, 바코드목록 필터 적용 (작업장)
		3. 작업장 해제 시, 바코드목록 필터 해제 (작업장)
		
	2023-09-06, Kim CheolEon : 조회 순서 변경
		1. 조건 입력 후 조회 시, 피킹 오더만 조회
		2. 좌측 Grid (PickingOrderList) 위의 조회 버튼 누를 시, PickingBarcodeList 의 데이터 조회 (OrderNo)
	
*/
var WORKCENTER_DATA;

function fnSaveWorkCenterList(_grid, _json)
{
	if(_grid, _json)
	{
		_grid.resetData([]);
		
		let parse = JSON.parse(_json);
		WORKCENTER_DATA = parse;
	}
	
	fnSetWorkCenterGridRow();
}

function fnSetWorkCenterGridRow()
{
	let chkOrderRows = sGrid.getCheckedRows();

	wGrid.resetData([]);
	
	if(chkOrderRows && WORKCENTER_DATA)
	{
		if(chkOrderRows.length > 0 && WORKCENTER_DATA.length > 0)
		{
			let chkWipOrderNoList = [];
			//chkWipOrderNoList = Object.values(chkOrderRows).map(item => item.WipOrderNo);
			chkWipOrderNoList = chkOrderRows.map(item => item.WipOrderNo);
			
			if(chkWipOrderNoList.length > 0)
			{
				let existsData = WORKCENTER_DATA.filter(item => chkWipOrderNoList.includes(item.WipOrderNo))
				if(existsData.length > 0)
				{
					//중복 작업장 삭제 (WipOrderNo 는 Order랑 비교했으니 더이상 필요없음)
					let distinct = existsData.filter((item, index, callback) => index === callback.findIndex(t => t.WorkCenterCode === item.WorkCenterCode))
					
					if(distinct.length > 0)
					{
						reset = false;
						
						wGrid.resetData([]);
						
						wGrid.resetData(distinct);
						
						// 초기 작업장 전체 선택
						wGrid.checkAll();
					}
				}
			}
		}
	}
}

wGrid.on('check', (evt) => fnWorkCenterRowCheck(evt, 'check'))
wGrid.on('checkAll', (evt) => fnWorkCenterRowCheck(evt, 'checkAll'))
wGrid.on('uncheck', (evt) => fnWorkCenterRowCheck(evt, 'uncheck'))
wGrid.on('uncheckAll', (evt) => fnWorkCenterRowCheck(evt, 'uncheckAll'))
function fnWorkCenterRowCheck(_evt, _type)
{
	if(_evt)
	{
		let checkRow = _evt.instance.getCheckedRows();
		if(checkRow.length > 0)
		{
			//let workcenterList = checkRow.map(item => item.WorkCenterCode)
			let workcenterList = checkRow.map(item => item.WorkCenter)
			if(workcenterList.length > 0 && tGrid)
			{
				let filterList = [];
				
				for(const elment of workcenterList)
				{
					opt = {code: "eq", value: elment};
					filterList.push(opt);
				}
				tGrid.setFilter("WorkCenter", {type: "text", operator: "OR"});
				tGrid.filter("WorkCenter", filterList);
			}
		}
		else
		{
			//tGrid.unfilter("WorkCenter");
			tGrid.setFilter("WorkCenter", {code: "eq", value: " "});
		}
	}
	else
	{
		//tGrid.unfilter("WorkCenter");
		tGrid.setFilter("WorkCenter", {code: "eq", value: " "});
	}
}

/* ********************************************************************************************* */

// 오더목록 피킹상태 class 적용
function fnOrderStatusClassApply(oGrid, aJSONData) {
	
	wGrid ? wGrid.resetData([]) : null;
	tGrid ? tGrid.resetData([]) : null;
	
	let aValues = sGrid.getData();
	let rowKey  = 0;
	
	if (aValues.length){
		for(let val of aValues){
			rowKey = parseInt(val.rowKey);
			if(val.OrderPickingStatus === "[30] 피킹List발행"){

				sGrid.addRowClassName(rowKey, "bgColDarkGray");

			}else{
				sGrid.removeRowClassName(rowKey, "bgColDarkGray");
			}
		}
	}
}

// 바코드목록 피킹상태 class 적용
function fnBarcodeStatusClassApply(oGrid, aJSONData) {
	let aValues = tGrid.getData();
	let rowKey  = 0;

	if (aValues.length){
		$('.loadingLayer').show();
		
		for(let val of aValues){
			rowKey = parseInt(val.rowKey);
			if(val.OrderPickingStatus === "[30] 피킹List발행"){
			
				tGrid.addRowClassName(rowKey, "bgColDarkGray");
			
			}else{
				tGrid.removeRowClassName(rowKey, "bgColDarkGray");
			}
		}
		
		$('.loadingLayer').hide();
	}
	
	// 바코드목록 필터 초기화
	//fnInitBarcodeFilter();
	//fnBoacodeFilter();
}



// 바코드 목록 그리드 Excel Export
function fnPickingBarcodeExcelExport() 
{
	/*	CHECK [1]	*/
	if( !(tGrid) )
	{
		gfnShowSnackBar('error', "Grid를 찾을 수 없습니다.");
		return;
	}
	
	let cDate = new Date();
	let yyyyMMddhhmmss = "".concat(
		cDate.getFullYear() 
	   ,gfnPad((1 + cDate.getMonth()), "2") 
	   ,gfnPad(cDate.getDate(), "2") 
	   ,cDate.getHours() 
	   ,cDate.getMinutes() 
	   ,cDate.getSeconds() 
	   ,cDate.getMilliseconds()
	);
	const options = {
		fileName: "".concat(tGrid.el.id, '_ExcelExport'),
		onlyFiltered: true,
	};
	options.fileName = "".concat(options.fileName, "_"+yyyyMMddhhmmss);
	
	tGrid.export('xlsx', options);
	
	/*	CHECK [2]	*/
	//피킹번호 목록(필터된 row)에 행이 있는가?
	let barcodeList = tGrid.getFilteredData();
	if( !(barcodeList.length > 0) )
	{
		gfnShowSnackBar('error', "".concat(BODY_CONTEXT.literals.DI_ERR_EntryNO, ' : PickingNo'));
		return;
	}
	
	/*	CHECK [3]	*/
	//피킹 지시 상태 row 가 있는가?
	let hasUpdateTarget = barcodeList.map(item => item.OrderPickingStatus).includes("[20] 피킹지시")
	if( !(hasUpdateTarget) )
	{
		gfnShowSnackBar('error', "".concat(BODY_CONTEXT.literals.DI_ERR_EntryNO, ' : PickingNo'));
		return;
	}
	
	
	let chkWOList = sGrid ? sGrid.getCheckedRows() : [];
	let chkWCList = wGrid ? wGrid.getCheckedRows() : [];
	
	let woList = chkWOList.map(item => item.WipOrderNo);     //선택된 행에서 WipOrderNo 만 추출
	let wcList = chkWCList.map(item => item.WorkCenterCode); //선택된 행에서 WorkCenter 만 추출
	
	/*	CHECK [4]	*/
	if( !(woList.length > 0 && wcList.length > 0) )
	{
		gfnShowSnackBar('error', "".concat(BODY_CONTEXT.literals.DI_ERR_EntryNO, ' : WipOrderNo, WorkCenter'));
		return;
	}
	
	/*	CHECK [5]	*/
	//2023-09-18, Kim CheolEon :: 상세조회 당시의 WipOrderNo 와, 엑셀 처리시의 선택된 WipOrderNo 가 다를 경우 체크
	let equal = gfnArrayEqualCheck(woList, dschWipOrderNoList)
	if( !(equal) )
	{
		gfnShowSnackBar('error', "".concat(BODY_CONTEXT.literals.DI_ERR_PickingDetailSearchNotEqual, ' : WipOrderNo'));
		return;
	}
	
	
	/* ALL PASS */
	PickingStatusChangeFrom20To30(woList, wcList);
}


function PickingStatusChangeFrom20To30(_woList, _wcList)
{	
	let inputs = {};
	inputs.EXT_Facility_SC = gFacility  ? gFacility.value : "";
	inputs.EXT_WipOrderNoListString = _woList.join('∑');
	inputs.EXT_WorkCenterListString = _wcList.join('∑');
	
	//2023-09-08, Kim CheolEon : 마지막 상세조회의 조건으로 전송할 경우, 작업장 핉터링한 내용에 대해 달라지기 때문에 현재 표시된 데이터를 기준으로 요청해야함.
	//inputs.EXT_SearchConditionJSON = PCKING_BARCODE_CONDITIONS.EXT_SearchConditionJSON;
	BODY_CONTEXT.callOperation('DIOEM_HV_MM_PICKLIST_EXPORT_OPR', inputs,
        function(outputs){ 
			if(outputs.EXT_ResultCode == "S")
			{
				gfnShowSnackBar('info', "".concat(BODY_CONTEXT.literals.DI_TITLE_Confirmation, " : ", outputs.EXT_ResultMessage), 'M');
				fnRowRequest();
			}
			else if(outputs.EXT_ResultCode == "W")
			{
				gfnShowSnackBar('warning', "".concat(BODY_CONTEXT.literals.DI_TITLE_Confirmation, " : ", outputs.EXT_ResultMessage), 'M');
				fnRowRequest();
			}
			else
			{
				gfnShowSnackBar('error', "".concat(BODY_CONTEXT.literals.DI_MNT_IncompleteAlertMessage, " : ", outputs.EXT_ResultMessage), 'M');
			}
        },
        function(message) {
            console.log("오류발생 : " + message);
			gfnShowSnackBar('error', message, 'M');
			return;
        }
	);
}






// 피킹재생성 버튼 클릭시 :: OEM_MM_PICKING 권한 필요
function fnRePicking() {
	if(confirm(BODY_CONTEXT.literals.DI_COL_ConfirmRegeneratePickingOrder)){
		// 피킹List발행 상태로 수정
		let inputs      = {};
		let arr         = new Array();					
		let aValues     = sGrid.getCheckedRows();
		let sWipOrderNo = "";
		
		//console.log("aValues ::: " + JSON.stringify(aValues));
		if (aValues.length){
			for(let val of aValues){
				if(val.OrderPickingStatus === "[20] 피킹지시" || val.OrderPickingStatus === "[30] 피킹List발행"){
					arr.push(val.WipOrderNo);
				}
			}
			sWipOrderNo = arr.join(",");
			//console.log("sWipOrderNo ::: " + sWipOrderNo);
			
			inputs.EXT_Facility_SC    = gFacility  ? gFacility.value : "";
			inputs.EXT_WipOrderNoText = sWipOrderNo;
			
			//console.log("피킹재생성 ::: inputs ===> " + JSON.stringify(inputs));
		    BODY_CONTEXT.callOperation('DIOEM_HV_MM_REPICKING_OPR', inputs,
		        function(outputs){ 
					// 그리드 새로고침(재조회)
					fnRowRequest();
		        },
		        function(message) {
		            console.log("오류발생 : " + message);
					//alert(message);
		        });	
		}else{
			alert(BODY_CONTEXT.literals.DI_ERR_SELECT_DATA);
		}
	}	
}
//###############################################################################################################//
//###############################################################################################################//
//###############################################################################################################//
//###############################################################################################################//
//###############################################################################################################//


.ToastUI-SubGroup.Left
{
	width: 35%;
	height: 100%;
	float: left;
	margin-right: 1%;
}

.ToastUI-SubGroup.Middle
{
	width: 13%;
	height: 100%;
	float: left;
	margin-right: 1%;
}

.ToastUI-SubGroup.Right
{
	width: 50%;
	height: 100%;
	float: left;
}
.bgColDarkGray {
	background-color:#a5a5a5!important;
}


//###############################################################################################################//
//###############################################################################################################//
//###############################################################################################################//
//###############################################################################################################//
//###############################################################################################################//

<!-- 포커스 흡수기 -->
<input autofocus="true" style="display:none; width:1px; height:1px;"/>

<audio class="ErrorBeepSound" src="scripts/sounds/beep.wav" type="audio/wav" style="dispaly: none;" preload="auto"/>
<template id="SnackBarInit">
	<div id="SnackBarViewFrame">
	</div>
</template>

<template id="SnackBarContent">
	<div class="MessageBody">
		<i class="Icon"></i>
		<div class="Text"></div>
	</div>
</template>

<div class="Bottom-Search-Layer">
	<div class="comButtonLayer">
	    <div class="btnComDiv">
			<span page="1" id="btnComSearch" class="PageButton ComSearch" onclick="gfnSetSearchType('ComSearch');">
				<img src="/Apriso/Portal/images/action_find_s18.png" width="24" hight="24"/>품번 및 업체검색
			</span>
			<span page="2" id="btnComMaterialMaster" class="PageButton ComMaterialMasterList" onclick="gfnSetSearchType('ComMaterialMasterList');">
				<img src="/Apriso/Portal/images/action_properties_s18.png" width="24" hight="24"/>품목Master
			</span>
			<span page="3" id="btnComInventoryMaster" class="PageButton ComInventoryMasterList" onclick="gfnSetSearchType('ComInventoryMasterList');">
				<img src="/Apriso/Portal/images/apr_gen_24_gears.png" width="24" hight="24"/>재고Master
			</span>
			<span page="4" id="btnComInventoryBalance" class="PageButton ComInventoryBalanceList" onclick="gfnSetSearchType('ComInventoryBalanceList');">
				<img src="/Apriso/Portal/images/apr_gen_24_graph.png" width="24" hight="24"/>재고Balance
			</span>
			<span page="5" id="btnComInventoryPO" class="PageButton ComInventoryPOList" onclick="gfnSetSearchType('ComInventoryPOList');">
				<img src="/Apriso/Portal/images/action_job_create.png" width="24" hight="24"/>재고 및 발주현황
			</span>
			<span class="btnWrapper">
				<span class="btnLayerControll UpButton Active" onclick="gfnBottomLayerFolding(false)">
					<img src="/Apriso/Portal/images/apr_action_24_up.png" width="24" hight="24"/>
				</span>
				<span class="btnLayerControll DownButton" onclick="gfnBottomLayerFolding(true)">
					<img src="/Apriso/Portal/images/apr_action_24_down.png" width="24" hight="24"/>
				</span>
			</span>
		</div>
	</div>
	<div class="ToastUI-COM-MainView">
		<div class="ToastUI-COM-Container">
			<div class="ToastUI-COM-SearchGroup">
				<span id="spnComProductNo">
					품번:&nbsp;
					<input id="EXT_COMProductNo_SC" name="EXT_COMProductNo_SC" value="" class="COMProductNo"/>
				</span>
				<span id="spnComPartnerNo">
					업체코드/업체명&nbsp;
					<input id="EXT_COMPartnerNo_SC" name="EXT_COMPartnerNo_SC" value="" class="COMPartnerNo"/>
				</span>
				<span id="spnComSearch">
					<button type="button" onclick="gfnComRowRequest()">검 색</button>
				</span>
			</div>
			<div class="ToastUI-COM-GridGroup">
				<div page="1" class="Page ComSearch">
					<div id="ComMaterialList" class="tuiGrid ComMaterialList"></div>
					<div id="ComPartnerList" class="tuiGrid ComPartnerList"></div>
				</div>
				<div page="4" class="Page ComInventoryBalanceList">
					<div id="ComInventoryBalanceList" class="tuiGrid ComInventoryBalanceList"></div>
					<div class="BalanceInfo">
						<div class="Com EXT_ProductPurchaseLargeName">
							<span>{@DI_COL_AccountingClass:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_CurrentStock">
							<span>{@DI_COL_CurrentStock:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_RegularReservationInstructionQty">
							<span>{@DI_COL_RegularReservationInstructionQty:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_PurchaseRequiredQty">
							<span>{@DI_COL_PurchaseRequiredQty:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_PreStockQty">
							<span>{@DI_COL_PreStockQty:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_ProcurementName">
							<span>{@DI_COL_ProcurementType:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_SafetyStockQty">
							<span>{@DI_COL_SafetyStockQty:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_ExceptionReservationInstructionQty">
							<span>{@DI_COL_ExceptionReservationInstructionQty:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_PurchaseOrderQty">
							<span>{@DI_COL_PurchaseOrderQty:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_ERPInventoryQty">
							<span>{@DI_COL_ERPInventoryQuantity:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_PlanController">
							<span>{@DI_COL_PlanControllerCode:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_EndLineInventoryQty">
							<span>{@DI_COL_EndLineInventoryQty:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_TotDefectQty">
							<span>{@DI_COL_DefectInspectionScrapQty:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_ProductSupplyName">
							<span>{@DI_COL_ProductSupplyType:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_PurchaseTypeName">
							<span>{@DI_COL_OrderClassification:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<!-- -->
					</div>
				</div>
				<div page="3" class="Page ComInventoryMasterList">
					<div id="ComInventoryMasterList" class="tuiGrid ComInventoryMasterList"></div>
				</div>
				<div page="2" class="Page ComMaterialMasterList">
					<div id="ComMaterialMasterList" class="tuiGrid ComMaterialMasterList"></div>
				</div>
				<div page="5" class="Page ComInventoryPOList">
					<div id="ComInventoryPOList" class="tuiGrid ComInventoryPOList"></div>
					<div class="WipOrderInfo">
						<div class="Com EXT_BaseUnitOfMeasure">
							<span>{@DI_COL_Unit:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_MaterialType">
							<span>{@DI_COL_MaterialType:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_TotInventoryQty">
							<span>{@DI_COL_TotInventoryQty:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_PurchaseRequiredQty">
							<span>{@DI_COL_PurchaseRequiredQty:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_DefectQty">
							<span>{@DI_COL_DefectQty:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_InspectionQty">
							<span>{@DI_COL_InspectionQty:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_PlanController">
							<span>{@DI_COL_PlanControllerCode:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_PurchaseType">
							<span>{@DI_COL_OrderClassification:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_EndLineInventoryQty">
							<span>{@DI_COL_EndLineInventoryQty:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_RegularInstructionQty">
							<span>{@DI_COL_RegularInstructionQty:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_TotUnPOQty">
							<span>{@DI_COL_TotUnPOQty:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_MaterialController">
							<span>{@DI_COL_MaterialControllerCode:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_PDT">
							<span>{@DI_COL_LEADTIME:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_CurrentStockEndWarehouse">
							<span>{@DI_COL_CurrentStock:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_RegularReservationQty">
							<span>{@DI_COL_RegularReservationQty:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_TotUnGRQty">
							<span>{@DI_COL_TotUnGRQty:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_WarehouseController">
							<span>{@DI_COL_WarehouseControllerCode:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_WarehouseCode">
							<span>{@EXT_WarehouseCode:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_AvailableQty">
							<span>{@DI_COL_AvailableInventory:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_ExceptionInstructionQty">
							<span>{@DI_COL_ExceptionInstructionQty:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_MaterialCreateDate">
							<span>{@DI_COL_MaterialCreateDate:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_PurchaseController">
							<span>{@DI_COL_PurchaseControllerCode:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_LocationNo">
							<span>{@DI_COL_LocNo:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_ERPInventoryQty">
							<span>{@DI_COL_ERPInventoryQuantity:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_ExceptionReservationQty">
							<span>{@DI_COL_ExceptionReservationQty:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_LastGRDate">
							<span>{@DI_COL_LastGRDate:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_InspectionController">
							<span>{@DI_COL_InspectionOwner:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_InstructReservationQty">
							<span>{@DI_COL_InstructReservationQty:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_LastGIDate">
							<span>{@DI_COL_LastGIDate:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_MovingPrice">
							<span>{@DI_MNT_NET_Price:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_EndWarehouseInventoryAmount">
							<span>{@DI_COL_CurrentStockPrice:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_SAPMRPController">
							<span>{@DI_COL_MRPController:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
						<div class="Com EXT_PurchaseDate">
							<span>{@DI_COL_FinalOrderDate:text}:&nbsp;&nbsp;</span><input type="text" readonly="true"/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<template>
{@DI_TITLE_MSG_SearchedNoData}
</template>


<div class="loadingLayer" style="display:none;">
    <div class="loader"></div>
</div>

<div class="CustomModalDialogContent" style="display: none; z-index:-100;">
  	<div class="ContentInner">
		<i class="fa fa-exclamation-circle"></i>
		<span class="Message">
			<!--MESSAE -->
		</span>
	</div>
</div>



<script>
	/* 
		Apriso 에서 할당 받는 부분은 HTML 탭에 존재할 수 밖에 없음. 그 외의 Construct 속성 인자는 전부 Javascript 탭으로 이동 할것
		=> 호이스팅의 정상 동작을 위해서
	*/
    var CONT_CONTEXT         = $Context;
    var CONT_LANGUAGE_ID     = $Context.inputs.LanguageID;
    var CONT_EMPLOYEE_NO     = $Context.inputs.EmployeeNo;
    var CONT_OEM_FACILITY_YN = $Context.inputs.OEMFacilityYN; // 로그인한 사용자의 기본 Facility가 OEM인지 여부
    

$(document).ready(function(){
	// 기본 Facility가 OEM일 경우 검색부의 EXT_Facility_SC를 Readonly 처리
	if($(".Control.fc_EXT_Facility_SC select") && CONT_OEM_FACILITY_YN == "Y"){
		$(".Control.fc_EXT_Facility_SC select").attr("readonly", "readonly").attr("disabled", "disabled");
	}
	
	// 공통 Button 셋팅
	gfnSetComButton();

	// 최초 검색 그리드 Active
	//gfnSetSearchType('ComSearch');

	// [공통] Toast Grid Header 요청 
	gfnComHeaderRequest();
	// [공통] Toast Grid Data 요청
	gfnComRowRequest();

    gfnOEMInitSelectChangeEvent();
	
	// ToastGrid 존재할 때, keyUnbind 함수 적용
	// 2023-06-19, Kim CheolEon : 일관성있는 새로고침 차단
	//if(typeof(TOAST_GRID) != 'undefined')
	if(typeof(TOAST_GRID) != 'undefined' || typeof(CONT_COMMON_GRID) != 'undefined')
	{
		gfnAprisoKeydownUnbind();
	}
	// 2023-06-19, Kim CheolEon : Enter 누를때 auto advance 에 의해서 다음 element 로 이동하는데, 이제 없어지므로 최초 화면에서 블러처리
	$('*:focus').blur();
	
	
	
	
	if($('.fc_EXT_ProductNo_SC input').length > 0 && $('.fc_EXT_ProductName_SC input').length > 0)
	{
		$('.fc_EXT_ProductNo_SC input').on('input', function(){
			if(!$(this).val().trim()){ $('.fc_EXT_ProductName_SC input').val(''); }
		})
		$('.fc_EXT_ProductNo_SC input').bind('paste',function(e){
	    	let input = $(this);
	    	setTimeout(function(){
	        	let text = $(input).val();
	    		
				if(text)
				{
					let params = {};
					params.EXT_Facility    = gFacility.value;
                    params.EXT_LanguageID  = CONT_LANGUAGE_ID;
                    params.EXT_Routing	   = 'MaterialName';
                    params.EXT_SearchingNo = text;
					
					gfnSearchedName(CONT_CONTEXT, params);
				}	
	    	},100);
		});
	}
	
	if($('.fc_EXT_PartnerNo_SC input').length > 0 && $('.fc_EXT_PartnerName_SC input').length > 0)
	{
		$('.fc_EXT_PartnerNo_SC input').on('input', function(){
			if(!$(this).val().trim()){ $('.fc_EXT_PartnerName_SC input').val(''); }
		})
		$('.fc_EXT_PartnerNo_SC input').bind('paste',function(e){
	    	let input = $(this);
	    	setTimeout(function(){
	        	let text = $(input).val();
	    		if(text)
				{
					let params = {};
					params.EXT_Facility    = gFacility.value;
                    params.EXT_LanguageID  = CONT_LANGUAGE_ID;
                    params.EXT_Routing	   = 'PartnerName';
                    params.EXT_SearchingNo = text;
					
					gfnSearchedName(CONT_CONTEXT, params);
				}
	    	},100);
		});
	}
	
	
});

	
</script>

//###############################################################################################################//
//###############################################################################################################//
//###############################################################################################################//
//###############################################################################################################//
//###############################################################################################################//
/* ************************************* 외부 Library(JS) 호출 :: START ************************************* */

<script src="[AprisoScripts]/ACUSTOM/ToastUI/xlsx.full.min.js"></script>
<script src="[AprisoScripts]/ACUSTOM/ToastUI/tui-date-picker.js"></script>
<script src="[AprisoScripts]/ACUSTOM/ToastUI/tui-pagination.js"></script>
<script src="[AprisoScripts]/ACUSTOM/ToastUI/tui-grid.js"></script>

<script src="[AprisoScripts]/ACUSTOM/scanner/jquery.scannerdetection.js"></script>
<script src="[AprisoScripts]/ACUSTOM/DI_Common.js"></script>

/* ************************************* 외부 Library(JS) 호출 :: E N D ************************************* */





/* ************************************* Construct Value :: START ************************************* */

var CONT_REQUEST_CODE    = "DIOEM_HV_CO_COMMON_BOTTOM_FORM_VIEW";

/*
document.addEventListener('readystatechange', (event) => {
	// 첫번째로 선언된 객체(Btn) 이 화면 접속 시 활성화됨.
	CONT_BUTTON_CONFIG = { 
	                       btnComSearch : true				// 품번 및 업체검색
                     	 , btnComInventoryBalance : true	// 재고Balance
					 	 , btnComInventoryMaster : true		// 재고Master
					 	 , btnComMaterialMaster : true      // 품목Master
					 	 , btnComInventoryPO : true			// 재고 및 발주현황
					 	 };
						 
	CONT_CONTROLLER_TYPE = { 
	                       OEMPurchaseEmpCd : true	 // 구매담당자
                     	 , OEMMaterialEmpCd : true	 // 납입/자재담당자
					 	 , OEMWarehouseEmpCd : true	 // 창고담당자
					 	 , OEMInspectionEmpCd : true // 검사담당자
					 	 , OEMPlanEmpCd : true		 // 계획담당자
					 	 };						 
})
*/
var CONT_BUTTON_CONFIG   = {};
var CONT_CONTROLLER_TYPE = {};


/*	2023-08-24, Kim CheolEon :: gfnConcurrencyRequest 에서 요청하려는 갯수를 카운팅함.
	TUI 화면에서 더이상 사용되지 않는 변수
		var HEADER_COUNT  = Object.keys(TOAST_GRID).length;
		var ROW_COUNT     = Object.keys(TOAST_GRID).length;
*/
var REQ_HEAD_COUNT = 0;
var REQ_ROW_COUNT  = 0;
var RES_ROW_CHECK  = [];
var RES_HEAD_CHECK = [];


var CONT_COMMON_GRID     = {
	  ComMaterialList : gfnToastGrid('ComMaterialList') 
	, ComPartnerList : gfnToastGrid('ComPartnerList')
	, ComInventoryBalanceList : gfnToastGrid('ComInventoryBalanceList')
	, ComInventoryMasterList : gfnToastGrid('ComInventoryMasterList', 4, null)
	, ComMaterialMasterList : gfnToastGrid('ComMaterialMasterList', 2, null)
	, ComInventoryPOList : gfnToastGrid('ComInventoryPOList', null, "rowNum")
};

var CONT_HEADER_COUNT = Object.keys(CONT_COMMON_GRID).length;
var CONT_ROW_COUNT    = Object.keys(CONT_COMMON_GRID).length;


var CONT_TUIGRID = tui.Grid;
	CONT_TUIGRID.applyTheme('striped');
	CONT_TUIGRID.setLanguage('ko');
	
var CONT_BOTTOM_LAYER_SHOW = false;

var CONT_SNACK_BAR;
var CONT_SNACK_BAR_MAX = 10;

var gFacility           = document.querySelector('.Control.fc_EXT_Facility_SC select');
var gControllerType     = document.querySelector('.Control.fc_EXT_ControllerType_SC select');
var gControllerCode     = document.querySelector('.Control.fc_EXT_ControllerCode_SC select');
var gPurchaseType       = document.querySelector('.Control.fc_EXT_PurchaseType_SC select');
var gInspectionType     = document.querySelector('.Control.fc_EXT_InspectionType_SC select');
var gProcurementType    = document.querySelector('.Control.fc_EXT_ProcurementType_SC select');
var gSearchType         = document.querySelector('.Control.fc_EXT_SearchType_SC select');
var gDateSearchType     = document.querySelector('.Control.fc_EXT_DateSearchType_SC select');
var gRequiredQtyType    = document.querySelector('.Control.fc_EXT_RequiredQtyType_SC select');
var gProductSupplyType  = document.querySelector('.Control.fc_EXT_ProductSupplyType_SC select');
var gDirectDeliveryType = document.querySelector('.Control.fc_EXT_DirectDeliveryType_SC select');
var gInOutSearchType    = document.querySelector('.Control.fc_EXT_InOutSearchType_SC select');
var gPurchaseDay        = document.querySelector('.Control.fc_EXT_PurchaseDay_SC select');
var gPoErpsendDay       = document.querySelector('.Control.fc_EXT_PoErpsendDay_SC select');
var gWarehouse          = document.querySelector('.Control.fc_EXT_Warehouse_SC select');
var gWarehouseCode      = document.querySelector('.Control.fc_EXT_WarehouseCode_SC select');
var gWorkCenter         = document.querySelector('.Control.fc_EXT_WorkCenter_SC select');
var gPickingSearchType  = document.querySelector('.Control.fc_EXT_PickingSearchType_SC select');
var gPickingStatus      = document.querySelector('.Control.fc_EXT_PickingStatus_SC select');
var gQuotaStatus        = document.querySelector('.Control.fc_EXT_QuotaStatus_SC select');
var gJobCode            = document.querySelector('.Control.fc_EXT_JobCode_SC select');
var gPOProcessStatus    = document.querySelector('.Control.fc_EXT_POProcessStatus_SC select');
var gPOResultStatus     = document.querySelector('.Control.fc_EXT_POResultStatus_SC select');
var gHDDirectDeliveryType = document.querySelector('.Control.fc_EXT_HDDirectDeliveryType_SC select');
var gApprovalStatus     = document.querySelector('.Control.fc_EXT_ApprovalStatus_SC select');
var gMaterialType       = document.querySelector('.Control.fc_EXT_MaterialType_SC select');
var gSelfSupport        = document.querySelector('.Control.fc_EXT_SelfSupport_SC select');
var gDepartment         = document.querySelector('.Control.fc_EXT_Department_SC select');
var gReasonCode         = document.querySelector('.Control.fc_EXT_ReasonCode_SC select');
var gRequestStatus      = document.querySelector('.Control.fc_EXT_RequestStatus_SC select');
var gERPReturnStatus    = document.querySelector('.Control.fc_EXT_ERPReturnStatus_SC select');

var gProductNo          = document.querySelector('.Control.fc_EXT_ProductNo_SC input');
var gPartnerNo          = document.querySelector('.Control.fc_EXT_PartnerNo_SC input');
var gWipOrderNo         = document.querySelector('.Control.fc_EXT_WipOrderNo_SC input');
var gModelCode          = document.querySelector('.Control.fc_EXT_ModelCode_SC input');
var gRequestNo          = document.querySelector('.Control.fc_EXT_RequestNo_SC input');

var gFromSerialNo       = document.querySelector('.Control.fc_EXT_FromSerialNo_SC input');
var gToSerialNo			= document.querySelector('.Control.fc_EXT_ToSerialNo_SC input');

var gFromDate           = document.querySelector('.Control.fc_EXT_FromDate_SC input');
var gToDate             = document.querySelector('.Control.fc_EXT_ToDate_SC input');
var gFixDate            = document.querySelector('.Control.fc_EXT_FixDate_SC input');
var gTargetMonth        = document.querySelector('.Control.fc_EXT_TargetMonth_SC input');
var gYearMonth          = document.querySelector('.Control.fc_EXT_YearMonth_SC input');

var gSAPDiffType        = document.querySelector('.Control.fc_EXT_SAPDiffType_SC input:checked');

var gWipOrderNoText     = document.querySelector('.Control.fc_EXT_WipOrderNoText_SC textarea');
var gPickingNoText      = document.querySelector('.Control.fc_EXT_PickingNoText_SC textarea');
var gProductNoText      = document.querySelector('.Control.fc_EXT_ProductNoText_SC textarea');
var gOrderNoText        = document.querySelector('.Control.fc_EXT_OrderNoText_SC textarea');


var gPurchaseOrderNo    = document.querySelector('.Control.fc_EXT_PurchaseOrderNo_SC input');
var gDeliveryReportNo   = document.querySelector('.Control.fc_EXT_DeliveryReportNo_SC input');
var gDeliveryDocumentNo = document.querySelector('.Control.fc_EXT_DeliveryDocumentNo_SC input');
var gBarCodeNo          = document.querySelector('.Control.fc_EXT_BarCodeNo_SC input');

var gPOSupplierExceptCheck   = document.querySelector('.Control.fc_EXT_POSupplierExceptCheck_SC input');
var gScheduledInclusionCheck = document.querySelector('.Control.fc_EXT_ScheduledInclusionCheck_SC input');
var gGRInclusionCheck        = document.querySelector('.Control.fc_EXT_GRInclusionCheck_SC input');
var gOverOrderCheck          = document.querySelector('.Control.fc_EXT_OverOrderCheck_SC input');
var gNotInStockCheck         = document.querySelector('.Control.fc_EXT_NotInStockCheck_SC input');
var gDualizedCheck           = document.querySelector('.Control.fc_EXT_DualizedCheck_SC input');
var gSAPInventoryCheck       = document.querySelector('.Control.fc_EXT_SAPInventoryCheck_SC input');
var gBackLogCheck            = document.querySelector('.Control.fc_EXT_BackLogCheck_SC input');
var gSubcontractCheck        = document.querySelector('.Control.fc_EXT_SubcontractCheck_SC input');
var gPurchaseAgencyCheck     = document.querySelector('.Control.fc_EXT_PurchaseAgencyCheck_SC input');
var gPartnerStockCheck       = document.querySelector('.Control.fc_EXT_PartnerStockCheck_SC input');
var gUnFinishCheck           = document.querySelector('.Control.fc_EXT_UnFinishCheck_SC input');
var gFromDateAfterCheck      = document.querySelector('.Control.fc_EXT_FromDateAfterCheck_SC input');
var gCompleteCheck           = document.querySelector('.Control.fc_EXT_CompleteCheck_SC input');
var gBarcode


var CONT_RESIZE_DELAY = 150;
var CONT_RESIZE_TIMER = null;
/* ************************************* Construct Value :: E N D ************************************* */

$( function() {
   	$( ".CustomModalDialogContent" ).dialog({
   	    resizable: false
		,draggable: false
		,autoOpen: false
      	,modal: true
   	    ,height: "auto"
		,width: "45%"
		// 아래의 Class 에 CSS 가 의존중
		,dialogClass: "InitCustomModalDialog"
   	});
});

//gfnShowCustomDialog("타이틀", "바디", 'red', "확인버튼", function(){ alert('test'); }, "취소버튼")
function gfnShowCustomDialog(_titleText, _bodyText, _color, _confirmText, _confirmFunc, _cancelText)
{
	//팝업제목 지정
	$( ".InitCustomModalDialog .ui-dialog-titlebar" ).text(_titleText)
	//팝업 주의문구 지정
	//$( ".InitCustomModalDialog .ui-dialog-content .Message" ).text(_bodyText)
	$( ".InitCustomModalDialog .ui-dialog-content .Message" ).html(_bodyText)
	
	//주의 문구 시 컬러 추가할 것 (없으면 black)
	if(!_color) 
	{
		$( ".InitCustomModalDialog .ui-dialog-content .Message" ).css('color', 'black');
	} 
	else 
	{
		$( ".InitCustomModalDialog .ui-dialog-content .Message" ).css('color', _color);
	}

	//버튼에 전달된 함수 셋팅
	$( ".CustomModalDialogContent" ).dialog( "option", "buttons", 
	    [
			{
	    		text: _confirmText,
	    		icon: "ui-icon-heart",
	    		click: function() {
					_confirmFunc();
					$(this).dialog("close");
	    		},
				class: 'CustomModalButton Button1 Primary'
	   		},
			{
				text: _cancelText,
	    		icon: "ui-icon-heart",
	    		click: function() {
					$(this).dialog("close");
	    		},
				class: 'CustomModalButton Button2 Secondary'
			}
		]
	);
	
	//세팅된 팝업 보이기
	$( ".CustomModalDialogContent" ).dialog('open');
}


document.addEventListener('readystatechange', (event) => {
    if(event.target.readyState == 'interactive')
    {
        gfnSnackBarInit();
		
    }
})

/* resize 이벤트는 창을 잡아서 늘릴때도 반응하므로, 과도한 처리를 방지하기 위해 지연시간 150ms 추가 */
window.addEventListener('resize', function(){ 
	clearTimeout(CONT_RESIZE_TIMER)
	CONT_RESIZE_TIMER = setTimeout(function(){
		gfnOEMResizeActionRelease();
	}, CONT_RESIZE_DELAY)
}, false)
	
function gfnOEMResizeActionRelease()
{
	//console.log('gfnOEMResizeActionRelease');
	//TUI Grid 미적용 없는 화면에서도 동작할 수 있도록 예외처리
	if(typeof(TOAST_GRID) != 'undefined')
	{
		//Tui Grid 를 사용중인 공통 할당인자 :: TOAST_GRID
		if(TOAST_GRID)
		{
			let tuiGridList = Object.keys(TOAST_GRID);
			if(tuiGridList.length)
			{
				for(let i = 0; i < tuiGridList.length; i++)
				{
					// 개별 Grid 만큼 refresh 함수를 사용 (API Function)
					TOAST_GRID[tuiGridList[i]].refreshLayout();
				}
			}
		}
	}
}

function gfnErrorCallback(message)
{
	$('.loadingLayer').hide();
	alert(message);
}

// DropDownList 처리 Ajax
function gfnDropDownList(oSelect, aInParams, sAddAttribute){
    var inputs = {};
	inputs = aInParams;

    CONT_CONTEXT.callOperation(inputs.EXT_OprName_SC, inputs,
        function(outputs){ 
			if(aInParams.EXT_SearchAllYn == "N") outputs.EXT_SearchAllYn = "N";
			
			gfnSetSelectBox(oSelect, outputs, inputs.EXT_DefaultValue_SC, sAddAttribute);
			
			// Ajax 가 완료되기 전, change 쪽에 아래의 함수가 존재하면
			// 늦게 완료된 비동기 처리로 인하여 아래의 항목삭제기능 후, 다시 select가 그려짐
			if(oSelect[0] == $(gControllerType)[0])
			{
				gfnSetControllerType();
			}
			
			//2023-08-16, Kim CheolEon :: 입/불출 이 초기값
			if(oSelect[0] == $(gInOutSearchType)[0])
			{
				$(gInOutSearchType).val("GRnRR").prop("selected", true);
			}
        },
        function(message) {
            gfnErrorCallback(message);
        });
}

// 재고Balance 요청
function gfnOEMRequestInventoryBalanceInfo(){
    var inputs = {};
	inputs.EXT_Facility_SC  = gFacility  ? gFacility.value  : "";
	inputs.EXT_ProductNo_SC = spnComProductNo.querySelector('input').value ? spnComProductNo.querySelector('input').value : "";

	CONT_CONTEXT.callOperation('DIOEM_HV_MM_GET_INVENTORY_BALANCE_INFO_OPR', inputs,
						      ((outputs) => { gfnOEMSetInventoryBalanceInfo(outputs) }),
						      ((message) => { gfnErrorCallback(message) })       );
}

function gfnOEMSetInventoryBalanceInfo(_data)
{
	document.querySelector(".BalanceInfo .Com.EXT_ProductPurchaseLargeName 			 input").value = _data.EXT_ProductPurchaseLargeName;
	document.querySelector(".BalanceInfo .Com.EXT_CurrentStock						 input").value = _data.EXT_CurrentStock;
	document.querySelector(".BalanceInfo .Com.EXT_RegularReservationInstructionQty   input").value = _data.EXT_RegularReservationInstructionQty;
	document.querySelector(".BalanceInfo .Com.EXT_PurchaseRequiredQty                input").value = _data.EXT_PurchaseRequiredQty;  
	document.querySelector(".BalanceInfo .Com.EXT_PreStockQty                        input").value = _data.EXT_PreStockQty;
	document.querySelector(".BalanceInfo .Com.EXT_ProcurementName                    input").value = _data.EXT_ProcurementName;
	document.querySelector(".BalanceInfo .Com.EXT_SafetyStockQty                     input").value = _data.EXT_SafetyStockQty;
	document.querySelector(".BalanceInfo .Com.EXT_ExceptionReservationInstructionQty input").value = _data.EXT_ExceptionReservationInstructionQty;
	document.querySelector(".BalanceInfo .Com.EXT_PurchaseOrderQty                   input").value = _data.EXT_PurchaseOrderQty;
	document.querySelector(".BalanceInfo .Com.EXT_ERPInventoryQty                    input").value = _data.EXT_ERPInventoryQty;                  
	document.querySelector(".BalanceInfo .Com.EXT_PlanController                     input").value = _data.EXT_PlanController;                   
	document.querySelector(".BalanceInfo .Com.EXT_EndLineInventoryQty                input").value = _data.EXT_EndLineInventoryQty;
	document.querySelector(".BalanceInfo .Com.EXT_TotDefectQty                       input").value = _data.EXT_TotDefectQty;               
	document.querySelector(".BalanceInfo .Com.EXT_ProductSupplyName                  input").value = _data.EXT_ProductSupplyName;
	document.querySelector(".BalanceInfo .Com.EXT_PurchaseTypeName					 input").value = _data.EXT_PurchaseTypeName;
}


// 재고Balance 요청
function gfnOEMRequestInventoryPOInfo(){
    var inputs = {};
	inputs.EXT_Facility_SC  = gFacility  ? gFacility.value  : "";
	inputs.EXT_ProductNo_SC = spnComProductNo.querySelector('input').value ? spnComProductNo.querySelector('input').value : "";

	CONT_CONTEXT.callOperation('DIOEM_HV_MM_GET_INVENTORY_PO_INFO_OPR', inputs,
						      ((outputs) => { gfnOEMSetInventoryPOInfo(outputs) }),
						      ((message) => { gfnErrorCallback(message) })       );
}

function gfnOEMSetInventoryPOInfo(_data)
{
	document.querySelector(".WipOrderInfo .Com.EXT_BaseUnitOfMeasure           input").value = _data.EXT_BaseUnitOfMeasure          ;
	document.querySelector(".WipOrderInfo .Com.EXT_MaterialType                input").value = _data.EXT_MaterialType               ;
	document.querySelector(".WipOrderInfo .Com.EXT_TotInventoryQty             input").value = _data.EXT_TotInventoryQty            ;
	//document.querySelector(".WipOrderInfo .Com.EXT_PurchaseRequiredQty         input").value = _data.EXT_PurchaseRequiredQty        ;
	document.querySelector(".WipOrderInfo .Com.EXT_PurchaseRequiredQty         input").value = _data.EXT_TotUnPOQty                 ; // 연결된 AJAX 에 동일한것으로 설정됨
	document.querySelector(".WipOrderInfo .Com.EXT_DefectQty                   input").value = _data.EXT_DefectQty                  ;
	document.querySelector(".WipOrderInfo .Com.EXT_InspectionQty               input").value = _data.EXT_InspectionQty              ;
	document.querySelector(".WipOrderInfo .Com.EXT_PlanController              input").value = _data.EXT_PlanController             ;
	document.querySelector(".WipOrderInfo .Com.EXT_PurchaseType                input").value = _data.EXT_PurchaseType               ;
	document.querySelector(".WipOrderInfo .Com.EXT_EndLineInventoryQty         input").value = _data.EXT_EndLineInventoryQty        ;
	document.querySelector(".WipOrderInfo .Com.EXT_RegularInstructionQty       input").value = _data.EXT_RegularInstructionQty      ;
	document.querySelector(".WipOrderInfo .Com.EXT_TotUnPOQty                  input").value = _data.EXT_TotUnPOQty                 ;
	document.querySelector(".WipOrderInfo .Com.EXT_MaterialController          input").value = _data.EXT_MaterialController         ;
	document.querySelector(".WipOrderInfo .Com.EXT_PDT                         input").value = _data.EXT_PDT                        ;
	document.querySelector(".WipOrderInfo .Com.EXT_CurrentStockEndWarehouse    input").value = _data.EXT_CurrentStockEndWarehouse   ;
	document.querySelector(".WipOrderInfo .Com.EXT_RegularReservationQty       input").value = _data.EXT_RegularReservationQty      ;
	document.querySelector(".WipOrderInfo .Com.EXT_TotUnGRQty                  input").value = _data.EXT_TotUnGRQty                 ;
	document.querySelector(".WipOrderInfo .Com.EXT_WarehouseController         input").value = _data.EXT_WarehouseController        ;
	document.querySelector(".WipOrderInfo .Com.EXT_WarehouseCode               input").value = _data.EXT_WarehouseCode              ;
	document.querySelector(".WipOrderInfo .Com.EXT_AvailableQty                input").value = _data.EXT_AvailableQty               ;
	document.querySelector(".WipOrderInfo .Com.EXT_ExceptionInstructionQty     input").value = _data.EXT_ExceptionInstructionQty    ;
	document.querySelector(".WipOrderInfo .Com.EXT_MaterialCreateDate          input").value = _data.EXT_MaterialCreateDate         ;
	document.querySelector(".WipOrderInfo .Com.EXT_PurchaseController          input").value = _data.EXT_PurchaseController         ;
	document.querySelector(".WipOrderInfo .Com.EXT_LocationNo                  input").value = _data.EXT_LocationNo                 ;
	document.querySelector(".WipOrderInfo .Com.EXT_ERPInventoryQty             input").value = _data.EXT_ERPInventoryQty            ;
	document.querySelector(".WipOrderInfo .Com.EXT_ExceptionReservationQty     input").value = _data.EXT_ExceptionReservationQty    ;
	document.querySelector(".WipOrderInfo .Com.EXT_LastGRDate                  input").value = _data.EXT_LastGRDate                 ;
	document.querySelector(".WipOrderInfo .Com.EXT_InspectionController        input").value = _data.EXT_InspectionController       ;
	document.querySelector(".WipOrderInfo .Com.EXT_InstructReservationQty      input").value = _data.EXT_InstructReservationQty     ;
	document.querySelector(".WipOrderInfo .Com.EXT_LastGIDate                  input").value = _data.EXT_LastGIDate                 ;
	document.querySelector(".WipOrderInfo .Com.EXT_MovingPrice                 input").value = _data.EXT_MovingPrice                ;
	document.querySelector(".WipOrderInfo .Com.EXT_EndWarehouseInventoryAmount input").value = _data.EXT_EndWarehouseInventoryAmount;
	document.querySelector(".WipOrderInfo .Com.EXT_SAPMRPController            input").value = _data.EXT_SAPMRPController           ;
	document.querySelector(".WipOrderInfo .Com.EXT_PurchaseDate                input").value = _data.EXT_PurchaseDate               ;
}


// Toast Grid 데이터 요청 
function gfnRequestGridData(params, successCallback, optFunction, context){
    var inputs = {};
	inputs.EXT_RequestType         = params.EXT_RequestType;
	inputs.EXT_SearchConditionJSON = params.EXT_SearchConditionJSON;
	
//console.log("params ===> " + JSON.stringify(params));		
	let gridID = JSON.parse(params.EXT_SearchConditionJSON).GridID;
//console.log("inputs ===> " + JSON.stringify(inputs));
	
	context = context ? context : CONT_CONTEXT;
	
	context.callOperation('DIOEM_HV_MM_GET_TOAST_UI_GRID_DATA', inputs,
						      ((outputs) => { successCallback(outputs, gridID, optFunction) }),
						      ((message) => { gfnErrorCallback(message) })       );
}

//[화면] Toast Grid Header 셋팅 
function gfnSetGridHeader(_data, _gridID, optFunction){
	let data = _data;
	let code = _gridID;
	
	(--REQ_HEAD_COUNT);

	if(data && code){
		if(data.EXT_ResultJSONData){
		
			RES_HEAD_CHECK.push({
				 GridID: _gridID
				,Result: 'Y'
			});
			
			if(TOAST_GRID && TOAST_GRID[code]){
				let parse = JSON.parse(data.EXT_ResultJSONData)
				
				//2023-08-21, Kim CheolEon 포맷터 함수를 통해 포맷팅을 해도, filter type : number 에 대해서 찾아내지를 못함. (문자열이 되기때문으로 추측)
				for(let [i, obj] of parse.entries())
				{
				    if(parse[i].filter.type === "number")
				    {
				        parse[i].formatter = function(row){
				            //return row.value.toLocaleString();
							return row.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
				        }
				    }
				}
				for(let [i, obj] of parse.entries())
				{
				    if(parse[i].filter.type === "select")
				    {
				        parse[i].operator = 'OR';
				    }
				}

				TOAST_GRID[code].setColumns(parse);
			}
			// 2023-08-08 이정원 추가
			//if("function" === typeof(optFunction)){
			//	optFunction(TOAST_GRID[code], data.EXT_ResultJSONData);
			//}
		}
		else
		{
			RES_HEAD_CHECK.push({
				 GridID: _gridID
				,Result: 'N'
			});
		}
	}
	
	if(REQ_HEAD_COUNT <= 0){
		//따로 헤더는 체크 항목 안넣었음
		$('.loadingLayer').hide();
	}
	
	// 2023-09-14, Kim CheolEon :: 수행시작 위치 이동
	// 복잡한 처리, 시간이 오래 걸리는 처리일 경우 로딩이 먼저 없어지는 경우가 생김.
	// 별개의 작업으로 구별하기위해 마지막에 처리
	if("function" === typeof(optFunction))
	{
		if(data && code)
		{
			if(data.EXT_ResultJSONData)
			{
				if(TOAST_GRID && TOAST_GRID[code])
				{
					optFunction(TOAST_GRID[code], data.EXT_ResultJSONData);
				}
			}
		}
	}
}

//[화면] Toast Grid Data 셋팅 
function gfnSetGridRow(_data, _gridID, optFunction){
	let data = _data;
	let code = _gridID;

	(--REQ_ROW_COUNT);
	
	//console.log("gfnSetGridRow ::: ["+_gridID+"]_data ::: " + JSON.stringify(_data));
	if(data && code){
		if(data.EXT_ResultJSONData){
			
			RES_ROW_CHECK.push({
				 GridID: _gridID
				,Result: 'Y'
			});
			
			if(TOAST_GRID && TOAST_GRID[code]){
				
				let parse = JSON.parse(data.EXT_ResultJSONData);
			
				TOAST_GRID[code].resetData(parse);
				TOAST_GRID[code].resetOriginData();
				
				if(parse.length > 0)
				{
					if(parse[0].SortOrder)
					{
						TOAST_GRID[code].sort('SortOrder', true, true);
					}
				}
				
				
				//TOAST_GRID[code].refreshLayout();
				//if("function" === typeof(optFunction)){
				//	optFunction(TOAST_GRID[code], data.EXT_ResultJSONData);
				//}
			}
		}else{
		
			RES_ROW_CHECK.push({
				 GridID: _gridID
				,Result: 'N'
			});
			
			if(TOAST_GRID && TOAST_GRID[code]){	
				TOAST_GRID[code].resetData([]);
				TOAST_GRID[code].resetOriginData();
			}
		}
	}
	
	if(REQ_ROW_COUNT <= 0){
		$('.loadingLayer').hide();
		
		let RES_COUNT = 0;
		RES_ROW_CHECK.forEach(item => {
			if('Y' === item.Result){ ++RES_COUNT; }
		})
		
		if(RES_COUNT == 0)
		{
			gfnShowSnackBar("warning", CONT_CONTEXT.literals.DI_TITLE_MSG_SearchedNoData);
		}
	}
	
	// 2023-09-14, Kim CheolEon :: 수행시작 위치 이동
	// 복잡한 처리, 시간이 오래 걸리는 처리일 경우 로딩이 먼저 없어지는 경우가 생김.
	// 별개의 작업으로 구별하기위해 마지막에 처리
	if("function" === typeof(optFunction))
	{
		if(data && code)
		{
			if(data.EXT_ResultJSONData)
			{
				if(TOAST_GRID && TOAST_GRID[code])
				{
					optFunction(TOAST_GRID[code], data.EXT_ResultJSONData);
				}
			}
		}
	}	
}

// [화면] 조회조건 셋팅
function gfnSetSearchConditions(reqType, gridID){
	let params = {};
	
	params.EXT_RequestType = reqType;
	
	let sub = {};
	sub.ScreenID   = REQUEST_CODE;
	sub.GridID     = gridID;
	sub.EmployeeNo = CONT_EMPLOYEE_NO;
	sub.LanguageID = CONT_LANGUAGE_ID;
	
    if(gFacility)                 sub.Facility                = gFacility                 ? gFacility.value        : "";
    if(gControllerType)           sub.ControllerType          = gControllerType           ? gControllerType.value  : "";
    if(gControllerCode)           sub.ControllerCode          = gControllerCode           ? gControllerCode.value  : "";
    if(gPurchaseType)             sub.PurchaseType            = gPurchaseType             ? gPurchaseType.value    : "";
    if(gInspectionType)           sub.InspectionType          = gInspectionType           ? gInspectionType.value  : "";
    if(gProcurementType)          sub.ProcurementType         = gProcurementType          ? gProcurementType.value : "";
    if(gSearchType)               sub.SearchType              = gSearchType               ? gSearchType.value      : "";
	if(gDateSearchType)           sub.DateSearchType          = gDateSearchType           ? gDateSearchType.value  : "";
    if(gRequiredQtyType)          sub.RequiredQtyType         = gRequiredQtyType          ? gRequiredQtyType.value : "";
    if(gPurchaseDay)              sub.PurchaseDay             = gPurchaseDay              ? gPurchaseDay.value     : "";
	if(gSearchType)               sub.SearchType              = gSearchType               ? gSearchType.value      : "";
    if(gPoErpsendDay)             sub.PoErpsendDay            = gPoErpsendDay             ? gPoErpsendDay.value    : "";
    if(gWarehouse)                sub.Warehouse               = gWarehouse                ? gWarehouse.value       : "";
    if(gWarehouseCode)            sub.WarehouseCode           = gWarehouseCode            ? gWarehouseCode.value   : "";
    if(gWorkCenter)               sub.WorkCenter              = gWorkCenter               ? gWorkCenter.value      : "";
    if(gPickingSearchType)        sub.PickingSearchType       = gPickingSearchType        ? gPickingSearchType.value : "";
    if(gPickingStatus)            sub.PickingStatus           = gPickingStatus            ? gPickingStatus.value     : "";    
    if(gQuotaStatus)              sub.QuotaStatus             = gQuotaStatus              ? gQuotaStatus.value       : "";    
    if(gJobCode)                  sub.JobCode                 = gJobCode                  ? gJobCode.value           : "";
    if(gPOProcessStatus)          sub.POProcessStatus         = gPOProcessStatus          ? gPOProcessStatus.value   : "";
    if(gPOResultStatus)           sub.POResultStatus          = gPOResultStatus           ? gPOResultStatus.value    : "";
    if(gHDDirectDeliveryType)     sub.HDDirectDeliveryType    = gHDDirectDeliveryType     ? gHDDirectDeliveryType.value : "";
    if(gApprovalStatus)           sub.ApprovalStatus          = gApprovalStatus           ? gApprovalStatus.value       : "";
    if(gMaterialType)             sub.MaterialType            = gMaterialType             ? gMaterialType.value         : "";
    if(gSelfSupport)              sub.SelfSupport             = gSelfSupport              ? gSelfSupport.value          : "";
    if(gDepartment)               sub.Department              = gDepartment               ? gDepartment.value           : "";
    if(gReasonCode)               sub.ReasonCode              = gReasonCode               ? gReasonCode.value           : "";
    if(gRequestStatus)            sub.RequestStatus           = gRequestStatus            ? gRequestStatus.value        : "";
    if(gERPReturnStatus)          sub.ERPReturnStatus         = gERPReturnStatus          ? gERPReturnStatus.value      : "";
                
    if(gProductNo)                sub.ProductNo               = gProductNo                ? gProductNo.value  : "";
    if(gPartnerNo)                sub.PartnerNo               = gPartnerNo                ? gPartnerNo.value  : "";
    if(gWipOrderNo)               sub.WipOrderNo              = gWipOrderNo               ? gWipOrderNo.value : "";
    if(gModelCode)                sub.ModelCode               = gModelCode                ? gModelCode.value  : "";
    if(gRequestNo)                sub.RequestNo               = gRequestNo                ? gRequestNo.value  : "";
                               
    if(gFromSerialNo)             sub.FromSerialNo            = gFromSerialNo             ? gFromSerialNo.value : "";
    if(gToSerialNo)               sub.ToSerialNo              = gToSerialNo               ? gToSerialNo.value   : "";
                               
    if(gWipOrderNoText)           sub.WipOrderNoText          = gWipOrderNoText           ? (gWipOrderNoText.value).replaceAll("\n", ",") : "";
    if(gPickingNoText)            sub.PickingNoText           = gPickingNoText            ? (gPickingNoText.value).replaceAll("\n", ",") : "";
    if(gProductNoText)            sub.ProductNoText           = gProductNoText            ? (gProductNoText.value).replaceAll("\n", ",") : "";
	if(gOrderNoText)              sub.OrderNoText             = gOrderNoText              ? (gOrderNoText.value).replaceAll("\n", ",") : "";
                               
    if(gProductSupplyType)        sub.ProductSupplyType       = gProductSupplyType        ? gProductSupplyType.value  : "";
    if(gDirectDeliveryType)       sub.DirectDeliveryType      = gDirectDeliveryType       ? gDirectDeliveryType.value : "";
                               
    if(gPOSupplierExceptCheck)    sub.POSupplierExceptCheck   = gPOSupplierExceptCheck    ? Number(gPOSupplierExceptCheck.checked)   : 0;
    if(gScheduledInclusionCheck)  sub.ScheduledInclusionCheck = gScheduledInclusionCheck  ? Number(gScheduledInclusionCheck.checked) : 0;
    if(gGRInclusionCheck)         sub.GRInclusionCheck        = gGRInclusionCheck         ? Number(gGRInclusionCheck.checked)        : 0;
    if(gOverOrderCheck)           sub.OverOrderCheck          = gOverOrderCheck           ? Number(gOverOrderCheck.checked)          : 0;
    if(gNotInStockCheck)          sub.NotInStockCheck         = gNotInStockCheck          ? Number(gNotInStockCheck.checked)         : 0;
    if(gDualizedCheck)            sub.DualizedCheck           = gDualizedCheck            ? Number(gDualizedCheck.checked)           : 0;                           
    if(gSAPInventoryCheck)        sub.SAPInventoryCheck       = gSAPInventoryCheck        ? Number(gSAPInventoryCheck.checked)       : 0;
    if(gBackLogCheck)             sub.BackLogCheck            = gBackLogCheck             ? Number(gBackLogCheck.checked)            : 0;
	if(gSubcontractCheck)         sub.SubcontractCheck        = gSubcontractCheck         ? Number(gSubcontractCheck.checked)        : 0;
    if(gPurchaseAgencyCheck)      sub.PurchaseAgencyCheck     = gPurchaseAgencyCheck      ? Number(gPurchaseAgencyCheck.checked)     : 0;
	if(gPartnerStockCheck)        sub.PartnerStockCheck       = gPartnerStockCheck        ? Number(gPartnerStockCheck.checked)       : 0;
	if(gUnFinishCheck)            sub.UnFinishCheck           = gUnFinishCheck            ? Number(gUnFinishCheck.checked)           : 0;
	if(gFromDateAfterCheck)       sub.FromDateAfterCheck      = gFromDateAfterCheck       ? Number(gFromDateAfterCheck.checked)      : 0;
	if(gCompleteCheck)            sub.CompleteCheck           = gCompleteCheck            ? Number(gCompleteCheck.checked)           : 0;
    
    if(gPurchaseOrderNo)          sub.PurchaseOrderNo         = gPurchaseOrderNo          ? gPurchaseOrderNo.value    : ""; 
    if(gDeliveryReportNo)         sub.DeliveryReportNo        = gDeliveryReportNo         ? gDeliveryReportNo.value   : "";
    if(gDeliveryDocumentNo)       sub.DeliveryDocumentNo      = gDeliveryDocumentNo       ? gDeliveryDocumentNo.value : "";
	if(gBarCodeNo)                sub.BarCodeNo               = gBarCodeNo                ? gBarCodeNo.value : "";
    
    if(gFromDate)                 sub.FromDate                = gFromDate                 ? gFromDate.value : "1900-01-01"; // 암묵적 타입캐스팅 처리
    if(gToDate)                   sub.ToDate                  = gToDate                   ? gToDate.value   : "1900-01-01"; // 암묵적 타입캐스팅 처리
    if(gFixDate)                  sub.FixDate                 = gFixDate                  ? gFixDate.value  : "1900-01-01"; // 암묵적 타입캐스팅 처리
    if(gTargetMonth)              sub.TargetMonth             = gTargetMonth              ? gTargetMonth.value : "";
	if(gYearMonth)                sub.YearMonth               = gYearMonth                ? gYearMonth.value   : "";
	
	if(gSAPDiffType)              sub.SAPDiffType             = gSAPDiffType              ? gSAPDiffType.value : "";
	
	params.EXT_SearchConditionJSON = JSON.stringify(sub);
	
	return params;
}


// 병렬 요청
async function gfnConcurrencyRequest(objList, reqType){	
	
	if(objList.length != undefined)
	{
		if(objList.length > 0)
		{
			RES_ROW_CHECK  = [];
			RES_HEAD_CHECK = [];
			
			$('.loadingLayer').show();	
			
			//요청 처리 시작하는 리스트 갯수 저장 => 차감하여 로딩바 종료 시점 계산.
			//objList.filter(item => item === undefined)
			
			//여기서의 undefined 는, 화면에서 gfnConcurrencyRequest 의 리스트를 담을 때 담겨진 gfnRequestGridData 비동기 함수임.
			//length (갯수) 를 가져가려는 이유는, 화면에서 데이터 요청 시에 여러개의 탭(버튼) 을 동시에 요청하지 않고 하나씩만 요청할 때가 있어서임.
			/*
				화면에 Toast Grid 는 여러개인데, 한번에 여러개의 Grid를 요청하는 예시 :: DIOEM_HV_MM_UNPAID_GRID_VIEW
				화면에 Toast Grid 는 여러개인데, 활성화된 탭만 보내는 예시 :: DIOEM_HV_MM_IN_OUT_STATUS_GRID_VIEW
			*/
			let reqObjCount = objList.filter(item => (item === undefined && item !== null)).length;
			
			if("HEADER" === reqType)
			{
				//REQ_HEAD_COUNT = objList.length;
				REQ_HEAD_COUNT = reqObjCount;
			}
			else if("ROW" === reqType)
			{
				//REQ_ROW_COUNT = objList.length;
				REQ_ROW_COUNT = reqObjCount;
			}
			
			const request = await Promise.allSettled(objList);
			
			return request;
		}
	}
}

function gfnSearchedName(context, params){
    var inputs = {};
	inputs.EXT_Facility    = params.EXT_Facility;
	inputs.EXT_LanguageID  = params.EXT_LanguageID;
	inputs.EXT_Routing     = params.EXT_Routing;
	inputs.EXT_SearchingNo = params.EXT_SearchingNo;

    context.callOperation('DIOEM_HV_MM_GET_SEARCHED_NAME_AJAX', inputs,
        function(outputs){
			let jqElement = null;
			if("MaterialName" === inputs.EXT_Routing)
			{
				jqElement = $('.Control.fc_EXT_ProductName_SC');
				if(jqElement.length > 0)
				{
					jqElement.find('input').val(outputs.EXT_SearchedName);
				}
			}
			else if("PartnerName" === inputs.EXT_Routing)
			{
				jqElement = $('.Control.fc_EXT_PartnerName_SC');
				if(jqElement.length > 0)
				{
					jqElement.find('input').val(outputs.EXT_SearchedName);
				}
			}
		},
        function(message) {
            gfnErrorCallback(message);
        });
}






// Init 의 실행은 HTML 탭의 ready 상태에 수행
// 각 Element 가 존재할 경우에 이벤트를 부착하여 수행한다.
// params 의 전달인자는 다를 수 있으므로, 즉시실행함수로 return 객체를 전달하고있음.

// jQuery 의 on 이 아니라 Vanilla JS 를 사용한 이유는, jQuery 는 DOM 객체를 찾지 못하더라도 빈 객체가 반환되지 않기 때문...
// let dom = $('.NOTELEMENT') 
// if(dom) jquery 는 무조건 true.
function gfnOEMInitSelectChangeEvent(){
	let params = {};
	params.EXT_OprName_SC  = "DI_HV_TT_GET_COMMON_CODE_OPR"
	//params.EXT_OEMIncludeCodeYN_SC = "Y";
	
	// Facility DropDownList 의 초기설정 => Change 시에 연관된 모든 DropDownList 데이터 처리
	!gFacility ? null : gFacility.addEventListener('change', function(){
		let value = this.value;
		if(value)
		{
			if(gControllerType){
				gfnDropDownList( $(gControllerType)
			               , (function(){
						   		setParams = JSON.parse(JSON.stringify(params));
								setParams.EXT_Facility_SC  = gFacility.value;
								setParams.EXT_Module_SC    = "CO";
								setParams.EXT_GroupCode_SC = "OEMManagerType";
						   		return setParams 
						     }())
						   , null);
			}
			//Facility 가 바뀌면 ControllerCode 는 무조건 휘발되어야 이전 데이터가 남지 않음.
			!gControllerCode     ? null : gfnSelectBoxClear( $(gControllerCode       ) );

			if(gPurchaseType){
				gfnDropDownList( $(gPurchaseType)
			               , (function(){
						   		setParams = JSON.parse(JSON.stringify(params));
								setParams.EXT_Facility_SC  = gFacility.value;
								setParams.EXT_OEMIncludeCodeYN_SC = "Y";
								setParams.EXT_Module_SC    = "LD";
								setParams.EXT_GroupCode_SC = "OEMORDDV";
						   		return setParams 
						     }())
						   , null);
			}
			if(gInspectionType){
				gfnDropDownList( $(gInspectionType)
			               , (function(){
						   		setParams = JSON.parse(JSON.stringify(params));
								setParams.EXT_Facility_SC  = gFacility.value;
								setParams.EXT_OEMIncludeCodeYN_SC = "Y";
								setParams.EXT_Module_SC    = "LD";
								setParams.EXT_GroupCode_SC = "OEMINSDV";
						   		return setParams 
						     }())
						   , null);
			}
			if(gProcurementType){
				gfnDropDownList( $(gProcurementType)
			               , (function(){
						   		setParams = JSON.parse(JSON.stringify(params));
								setParams.EXT_Facility_SC  = gFacility.value;
								setParams.EXT_OEMIncludeCodeYN_SC = "Y";
								setParams.EXT_Module_SC    = "LD";
								setParams.EXT_GroupCode_SC = "OEMSRC";
						   		return setParams 
						     }())
						   , null);
			}
			if(gSearchType){
				gfnDropDownList( $(gSearchType)
			               , (function(){
						   		setParams = JSON.parse(JSON.stringify(params));
								setParams.EXT_Facility_SC  = gFacility.value;
								setParams.EXT_OEMIncludeCodeYN_SC = "Y";
								setParams.EXT_Module_SC    = "LD";
								setParams.EXT_GroupCode_SC = "OEMSearchType";
						   		return setParams 
						     }())
						   , null);
			}
			if(gRequiredQtyType){
				gfnDropDownList( $(gRequiredQtyType)
			               , (function(){
						   		setParams = JSON.parse(JSON.stringify(params));
								setParams.EXT_Facility_SC  = gFacility.value;
								setParams.EXT_OEMIncludeCodeYN_SC = "Y";
								setParams.EXT_Module_SC    = "LD";
								setParams.EXT_GroupCode_SC = "OEMRequiredQtyType";
						   		return setParams 
						     }())
						   , null);
			}
			if(gProductSupplyType){
				gfnDropDownList( $(gProductSupplyType)
			               , (function(){
						   		setParams = JSON.parse(JSON.stringify(params));
								setParams.EXT_Facility_SC  = gFacility.value;
								setParams.EXT_OEMIncludeCodeYN_SC = "Y";
								setParams.EXT_Module_SC    = "LD";
								setParams.EXT_GroupCode_SC = "OEMDTCMS";
						   		return setParams 
						     }())
						   , null);
			}
			if(gDirectDeliveryType){
				gfnDropDownList( $(gDirectDeliveryType)
			               , (function(){
						   		setParams = JSON.parse(JSON.stringify(params));
								setParams.EXT_Facility_SC  = gFacility.value;
								setParams.EXT_OEMIncludeCodeYN_SC = "Y";
								setParams.EXT_Module_SC    = "LD";
								setParams.EXT_GroupCode_SC = "OEMLWMATRDV";
						   		return setParams 
						     }())
						   , null);
			}
			if(gPurchaseDay){
				gfnDropDownList( $(gPurchaseDay)
			               , (function(){
						   		setParams = JSON.parse(JSON.stringify(params));
								setParams.EXT_Facility_SC = gFacility.value;
								setParams.EXT_OprName_SC  = "DIOEM_HV_TT_GET_PURCHASE_DAY_OPR";
						   		return setParams 
						     }())
						   , null);
			}	
			if(gPoErpsendDay){
				gfnDropDownList( $(gPoErpsendDay)
			               , (function(){
						   		setParams = JSON.parse(JSON.stringify(params));
								setParams.EXT_Facility_SC = gFacility.value;
								setParams.EXT_OprName_SC  = "DIOEM_HV_TT_GET_PO_ERPSEND_DAY_OPR";
						   		return setParams 
						     }())
						   , null);
			}			
			if(gWarehouse){
				gfnDropDownList( $(gWarehouse)
			               , (function(){
						   		setParams = JSON.parse(JSON.stringify(params));
								setParams.EXT_Facility_SC = gFacility.value;
								setParams.EXT_OprName_SC  = "DI_HV_TT_GET_WAREHOUSE_OPR";
						   		return setParams 
						     }())
						   , null);
			}				
			if(gWarehouseCode){
				gfnDropDownList( $(gWarehouseCode)
			               , (function(){
						   		setParams = JSON.parse(JSON.stringify(params));
								setParams.EXT_Facility_SC = gFacility.value;
								setParams.EXT_OprName_SC  = "DI_HV_TT_GET_WAREHOUSE_OPR";
						   		return setParams 
						     }())
						   , null);
			}		
			if(gWorkCenter){
				gfnDropDownList( $(gWorkCenter)
			               , (function(){
						   		setParams = JSON.parse(JSON.stringify(params));
								setParams.EXT_Facility_SC = gFacility.value;
								setParams.EXT_OprName_SC  = "DI_HV_TT_GET_WORKCENTER_OPR";
						   		return setParams 
						     }())
						   , null);
			}	
			if(gPickingSearchType){
				gfnDropDownList( $(gPickingSearchType)
			               , (function(){
						   		setParams = JSON.parse(JSON.stringify(params));
								setParams.EXT_Facility_SC  = gFacility.value;
								setParams.EXT_OEMIncludeCodeYN_SC = "Y";
								setParams.EXT_Module_SC    = "LD";
								setParams.EXT_GroupCode_SC = "OEMPickingSearchType";
						   		return setParams 
						     }())
						   , null);
			}
			if(gPickingStatus){
				gfnDropDownList( $(gPickingStatus)
			               , (function(){
						   		setParams = JSON.parse(JSON.stringify(params));
								setParams.EXT_Facility_SC  = gFacility.value;
								setParams.EXT_OEMIncludeCodeYN_SC = "Y";
								setParams.EXT_Module_SC    = "LD";
								setParams.EXT_GroupCode_SC = "OEMPickingStatus";
						   		return setParams 
						     }())
						   , null);
			}
			if(gQuotaStatus){
				gfnDropDownList( $(gQuotaStatus)
			               , (function(){
						   		setParams = JSON.parse(JSON.stringify(params));
								setParams.EXT_Facility_SC  = gFacility.value;
								setParams.EXT_OEMIncludeCodeYN_SC = "Y";
								setParams.EXT_Module_SC    = "LD";
								setParams.EXT_GroupCode_SC = "OEMQuotaStatus";
						   		return setParams 
						     }())
						   , null);
			}
			if(gJobCode){
				gfnDropDownList( $(gJobCode)
			               , (function(){
						   		setParams = JSON.parse(JSON.stringify(params));
								setParams.EXT_Facility_SC  = gFacility.value;
								setParams.EXT_OEMIncludeCodeYN_SC = "Y";
								setParams.EXT_Module_SC    = "CO";
								setParams.EXT_GroupCode_SC = "OEMJobCode";
						   		return setParams 
						     }())
						   , null);
			}
			if(gPOProcessStatus){
				gfnDropDownList( $(gPOProcessStatus)
			               , (function(){
						   		setParams = JSON.parse(JSON.stringify(params));
								setParams.EXT_Facility_SC  = gFacility.value;
								setParams.EXT_OEMIncludeCodeYN_SC = "Y";
								setParams.EXT_Module_SC       = "LD";
								setParams.EXT_GroupCode_SC    = "OEMPOProcessStatus";
								setParams.EXT_DefaultValue_SC = "1";
						   		return setParams 
						     }())
						   , null);
			}
			if(gPOResultStatus){
				gfnDropDownList( $(gPOResultStatus)
			               , (function(){
						   		setParams = JSON.parse(JSON.stringify(params));
								setParams.EXT_Facility_SC  = gFacility.value;
								setParams.EXT_OEMIncludeCodeYN_SC = "Y";
								setParams.EXT_Module_SC    = "LD";
								setParams.EXT_GroupCode_SC = "OEMPOPResultStatus";
						   		return setParams 
						     }())
						   , null);
			}
			if(gHDDirectDeliveryType){
				gfnDropDownList( $(gHDDirectDeliveryType)
			               , (function(){
						   		setParams = JSON.parse(JSON.stringify(params));
								setParams.EXT_Facility_SC  = gFacility.value;
								setParams.EXT_OEMIncludeCodeYN_SC = "Y";
								setParams.EXT_Module_SC    = "LD";
								setParams.EXT_GroupCode_SC = "OEMDirectDeliveryType";
						   		return setParams 
						     }())
						   , null);
			}
			if(gApprovalStatus){
				gfnDropDownList( $(gApprovalStatus)
			               , (function(){
						   		setParams = JSON.parse(JSON.stringify(params));
								setParams.EXT_Facility_SC  = gFacility.value;
								setParams.EXT_OEMIncludeCodeYN_SC = "Y";
								setParams.EXT_Module_SC    = "LD";
								setParams.EXT_GroupCode_SC = "OEMApprovalStatus";
						   		return setParams 
						     }())
						   , null);
			}
			if(gMaterialType){
				gfnDropDownList( $(gMaterialType)
			               , (function(){
						   		setParams = JSON.parse(JSON.stringify(params));
								setParams.EXT_Facility_SC  = gFacility.value;
								setParams.EXT_OEMIncludeCodeYN_SC = "Y";
								setParams.EXT_Module_SC    = "LD";
								setParams.EXT_GroupCode_SC = "OEMMaterialType";
						   		return setParams 
						     }())
						   , null);
			}
			if(gSelfSupport){
				gfnDropDownList( $(gSelfSupport)
			               , (function(){
						   		setParams = JSON.parse(JSON.stringify(params));
								setParams.EXT_Facility_SC  = gFacility.value;
								setParams.EXT_OEMIncludeCodeYN_SC = "Y";
								setParams.EXT_Module_SC    = "LD";
								setParams.EXT_GroupCode_SC = "OEMSelfSupport";
						   		return setParams 
						     }())
						   , null);
			}
			if(gDepartment){
				gfnDropDownList( $(gDepartment)
			               , (function(){
						   		setParams = JSON.parse(JSON.stringify(params));
								setParams.EXT_Facility_SC  = gFacility.value;
								setParams.EXT_OprName_SC  = "DIOEM_HV_TT_GET_DEPARTMENT_OPR";
						   		return setParams 
						     }())
						   , null);
			}
			if(gReasonCode){
				gfnDropDownList( $(gReasonCode)
			               , (function(){
						   		setParams = JSON.parse(JSON.stringify(params));
								setParams.EXT_Facility_SC  = gFacility.value;
								setParams.EXT_OEMIncludeCodeYN_SC = "Y";
								setParams.EXT_Module_SC    = "LD";
								setParams.EXT_GroupCode_SC = "OEMREQSPEC";
								setParams.EXT_UserData1_SC = "자재청구";
						   		return setParams 
						     }())
						   , null);
			}
			if(gRequestStatus){
				gfnDropDownList( $(gRequestStatus)
			               , (function(){
						   		setParams = JSON.parse(JSON.stringify(params));
								setParams.EXT_Facility_SC  = gFacility.value;
								setParams.EXT_OEMIncludeCodeYN_SC = "Y";
								setParams.EXT_Module_SC    = "LD";
								setParams.EXT_GroupCode_SC = "OEMREQST";
						   		return setParams 
						     }())
						   , null);
			}
			if(gInOutSearchType){
				gfnDropDownList( $(gInOutSearchType)
			               , (function(){
						   		setParams = JSON.parse(JSON.stringify(params));
								setParams.EXT_Facility_SC  = gFacility.value;
								setParams.EXT_Module_SC    = "LD";
								setParams.EXT_GroupCode_SC = "OEMInOutStatus";
						   		return setParams 
						     }())
						   , null);
			}
			if(gERPReturnStatus){
				gfnDropDownList( $(gERPReturnStatus)
			               , (function(){
						   		setParams = JSON.parse(JSON.stringify(params));
								setParams.EXT_Facility_SC  = gFacility.value;
								setParams.EXT_Module_SC    = "LD";
								setParams.EXT_GroupCode_SC = "OEMERPReturnStatus";
						   		return setParams 
						     }())
						   , null);
			}
		}
		//Facility value 없을 시 전부 초기화
		else
		{
			!gControllerType       ? null : gfnSelectBoxClear( $(gControllerType       ) );
			!gControllerCode       ? null : gfnSelectBoxClear( $(gControllerCode       ) );
			!gPurchaseType         ? null : gfnSelectBoxClear( $(gPurchaseType         ) );
			!gInspectionType       ? null : gfnSelectBoxClear( $(gInspectionType       ) );
			!gProcurementType      ? null : gfnSelectBoxClear( $(gProcurementType      ) );
			!gSearchType           ? null : gfnSelectBoxClear( $(gSearchType           ) );
			!gRequiredQtyType      ? null : gfnSelectBoxClear( $(gRequiredQtyType      ) );
			!gProductSupplyType    ? null : gfnSelectBoxClear( $(gProductSupplyType    ) );
			!gDirectDeliveryType   ? null : gfnSelectBoxClear( $(gDirectDeliveryType   ) );
			!gPurchaseDay          ? null : gfnSelectBoxClear( $(gPurchaseDay          ) );
			!gPoErpsendDay         ? null : gfnSelectBoxClear( $(gPoErpsendDay         ) );
			!gWarehouse            ? null : gfnSelectBoxClear( $(gWarehouse            ) );
			!gWarehouseCode        ? null : gfnSelectBoxClear( $(gWarehouseCode        ) );
			!gWorkCenter           ? null : gfnSelectBoxClear( $(gWorkCenter           ) );
			!gPickingSearchType    ? null : gfnSelectBoxClear( $(gPickingSearchType    ) );
			!gPickingStatus        ? null : gfnSelectBoxClear( $(gPickingStatus        ) );	
			!gQuotaStatus          ? null : gfnSelectBoxClear( $(gQuotaStatus          ) );
			!gJobCode              ? null : gfnSelectBoxClear( $(gJobCode              ) );	
			!gPOProcessStatus      ? null : gfnSelectBoxClear( $(gPOProcessStatus      ) );	
			!gPOResultStatus       ? null : gfnSelectBoxClear( $(gPOResultStatus       ) );		
			!gHDDirectDeliveryType ? null : gfnSelectBoxClear( $(gHDDirectDeliveryType ) );	
			!gApprovalStatus       ? null : gfnSelectBoxClear( $(gApprovalStatus       ) );	
			!gMaterialType         ? null : gfnSelectBoxClear( $(gMaterialType         ) );		
			!gSelfSupport          ? null : gfnSelectBoxClear( $(gSelfSupport          ) );		
			!gDepartment           ? null : gfnSelectBoxClear( $(gDepartment           ) );		
			!gReasonCode           ? null : gfnSelectBoxClear( $(gReasonCode           ) );	
			!gRequestStatus        ? null : gfnSelectBoxClear( $(gRequestStatus        ) );
			!gInOutSearchType      ? null : gfnSelectBoxClear( $(gInOutSearchType      ) );
			!gERPReturnStatus      ? null : gfnSelectBoxClear( $(gERPReturnStatus      ) );
		}
	})
	
	// Type 선택 시, Code 갱신 및 초기화
	!gControllerType ? null : gControllerType.addEventListener('change', function(){
		let value = this.value;
		let facility = gFacility.value;
		if(value && facility)
		{
			let params = {};
			params.EXT_OprName_SC  = "DI_HV_TT_GET_COMMON_CODE_OPR"
			gfnDropDownList( $(gControllerCode)
			               , (function(){
						   		setParams = JSON.parse(JSON.stringify(params));
								setParams.EXT_Facility_SC  = gFacility.value;
								setParams.EXT_OEMIncludeCodeYN_SC = "Y";
								setParams.EXT_Module_SC    = "CO";
								setParams.EXT_GroupCode_SC = !gControllerType ? null : gControllerType.value;
						   		return setParams 
						     }())
						   , null);
		}
		else
		{
			gfnSelectBoxClear( $(gControllerCode ) );
		}	
	})
}



// gfnTuiFilterClear
/*
	@tuiObjGroup : tuiGrid 객체 모음
	@tuiTagGroup : tuiGrid Tag가 연결된 상위 DOM
*/
function gfnTuiFilterClear(tuiObjGroup, tuiTagGroup) {
	if("object" === typeof(tuiObjGroup) && "object" === typeof(tuiTagGroup))
	{
		if(Object.keys(tuiObjGroup).length > 0 && tuiTagGroup.querySelectorAll('.tuiGrid').length > 0)
		{
			let currentGrid = tuiTagGroup.querySelector('.Active');
			if(currentGrid)
			{
				let gridID = currentGrid.id;
				
				let targetGrid = tuiObjGroup[gridID]
				if(targetGrid)
				{
					let colums = null;
					
					colums = targetGrid.getColumns();
					colums.forEach( (item) => { targetGrid.unfilter(item.name); } );
				}
			}
		}
	}
}

// gfnTuiExcelExport
/*
	@tuiObjGroup : tuiGrid 객체 모음
	@tuiTagGroup : tuiGrid Tag가 연결된 상위 DOM
	
	<sample>
	let TOAST_GRID = {
	 MaterialMaster : gfnToastGrid('MaterialMaster', 6)
	 ...
	}
	let gridView = document.querySelector('.Container .GridGroup');
	
	<button ... onclick="gfnTuiExcelExport(TOAST_GRID, gridView)></button>
*/
function gfnTuiExcelExport(tuiObjGroup, tuiTagGroup, targetColumns) {
	if("object" === typeof(tuiObjGroup) && "object" === typeof(tuiTagGroup))
	{
		if(Object.keys(tuiObjGroup).length > 0 && tuiTagGroup.querySelectorAll('.tuiGrid').length > 0)
		{
			let currentGrid = tuiTagGroup.querySelector('.Active');
			if(currentGrid)
			{
				let gridID = currentGrid.id;
				
				let targetGrid = tuiObjGroup[gridID]
				if(targetGrid)
				{
					let cDate = new Date();
					let yyyyMMddhhmmss = "".concat(
						cDate.getFullYear() 
	                   ,gfnPad((1 + cDate.getMonth()), "2") 
					   ,gfnPad(cDate.getDate(), "2") 
					   ,cDate.getHours() 
					   ,cDate.getMinutes() 
					   ,cDate.getSeconds() 
					   ,cDate.getMilliseconds()
					);
					
					const options = {
						fileName: "".concat(gridID, '_ExcelExport'),
						onlyFiltered: true,
						//includeHeader: false //default: true;
					};
					
					//2023-06-01, KCE : 엑셀 출력 시, 선택적출력을 원할 경우 배열 만나면 처리
					// 배열의 대상은 DI_HV_ST_TOAST_COL_INFO 테이블의 ColID 에 해당함. (Key)
					//Grid 의 컬럼은 grid.getColumns() 획득 가능
					if("object" === typeof(targetColumns))
					{
						if(targetColumns.length > 0)
						{
							options.columnNames = targetColumns;
						}
					}
					
					options.fileName = "".concat(options.fileName, "_"+yyyyMMddhhmmss);
					
					targetGrid.export('xlsx', options);
				}
			}
		}
	}
}
// 월/일 '0' PAD
function gfnPad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

// gfnTuiSwitcingViewGrid
/*
	@tuiObjGroup : tuiGrid 객체 모음
	@tuiTagGroup : tuiGrid Tag가 연결된 상위 DOM
	@gridID : gridID keyword
	@button : this
	
	<sample>
	let TOAST_GRID = {
	 MaterialMaster : gfnToastGrid('MaterialMaster', 6)
	 ...
	}
	let gridView = document.querySelector('.Container .GridGroup');
	
	gfnTuiSwitcingViewGrid(TOAST_GRID, gridView, 'InventoryMaster', this)
*/
function gfnTuiSwitcingViewGrid(tuiObjGroup, tuiTagGroup, gridID, button)
{
	if("object" === typeof(tuiObjGroup) && "object" === typeof(tuiTagGroup) && gridID)
	{
		if(Object.keys(tuiObjGroup).length > 0 && tuiTagGroup.querySelectorAll('.tuiGrid').length > 0)
		{
			let buttonGroup = button.parentNode;
			let targetGrid = tuiObjGroup[gridID]
			
			if(targetGrid && buttonGroup)
			{
				tuiTagGroup.querySelectorAll('.tuiGrid').forEach((item) => { item.classList.remove("Active") })
				buttonGroup.querySelectorAll('.ChangeButton').forEach((item) => { item.classList.remove("Primary", "Secondary"); })
				
				button.classList.add("Primary");
				targetGrid.el.classList.add("Active");
				
				targetGrid.refreshLayout();
			}
		}
	}
}


/* 
	2023-07-07 Kim CheolEon :: 헤더 렌더링 함수. Tui 메뉴얼에는 class(ES6) 로 선언되어있으나, 레거시 함수(ES5)로 변환
	https://nhn.github.io/tui.grid/latest/tutorial-example11-row-headers
*/
function ToastgridHeaderRender(props)
{
	const { grid, rowKey } = props;
	const gridKey = grid.el.id;
	
	const label = document.createElement('label');
	label.className = 'checkbox cust-container';
	label.setAttribute('for', String(rowKey + gridKey));
	
	const hiddenInput = document.createElement('input');
    hiddenInput.className = 'hidden-input';
    hiddenInput.id = String(rowKey);

    const customInput = document.createElement('span');
    customInput.className = 'custom-input cust-checkmark';

    label.appendChild(hiddenInput);
    label.appendChild(customInput);

    hiddenInput.type = 'checkbox';
    label.addEventListener('click', (ev) => {
      ev.preventDefault();

      if (ev.shiftKey) {
        grid[!hiddenInput.checked ? 'checkBetween' : 'uncheckBetween'](rowKey);
        return;
      }

      grid[!hiddenInput.checked ? 'check' : 'uncheck'](rowKey);
    });

    this.el = label;

    this.render(props);
}
ToastgridHeaderRender.prototype.getElement = function()
{
	return this.el;
}
ToastgridHeaderRender.prototype.render = function(props)
{
	const hiddenInput = this.el.querySelector('.hidden-input');
    const checked = Boolean(props.value);

    hiddenInput.checked = checked;
}



function gfnToastGrid(domID, frzCount, rowHeader, summary)
{
	let dom = document.getElementById(domID);
	
	if(!dom)
	{
		return null;
	}
	else
	{
		let headers = null
		if("checkbox" === rowHeader)
		{
			// 2023-07-08, Kim CheolEon, 커스텀렌더러 학습하여 적용함. Grid 를 동시에 2개 이상 깔아두는 케이스를 위해서 체크박스가 Grid를 구별할 수 있도록 domID(Grid이름) 를 덧붙임.
			headers = [{  type: 'checkbox',
						  header: '<label for="all-checkbox' + domID + '" class="checkbox cust-container"><input type="checkbox" id="all-checkbox' + domID + '" class="hidden-input" name="_checked" /><span class="custom-input cust-checkmark"></span></label>',
						  renderer: {
						  	type: ToastgridHeaderRender
						  }
				    }]
		}
		else if("rowNum" === rowHeader)
		{
			headers = [{type: 'rowNum', width: '65'}];
		}
		else
		{
			headers = [];
		}
		
		// 2차원 배열이여야 함
		//let context = [
		//	[
		//		name: 'Unique1',
		//		label: 'TEST1',
		//		action: function(){
		//			gfnToastGridContnext_1
		//		}
		//	]
		//];
		
		/* ================================================ */
		let gridObj = {
		    el: dom,
			bodyHeight: 'fitToParent',
		    data: null,
		    scrollX: true,
		    scrollY: true,
		    rowHeaders: headers,
			width: 'auto',
		    columnOptions: {
		        resizable: true,
				minWidth: 20,
				frozenCount: frzCount,
		    	frozenBorderWidth: 3
		    },
			//contextMenu: ({ rowKey, columnName }) => (
			//contextMenu: function( { rowKey, columnName } ){
			//	return gfnToastGridCallContext(rowKey, columnName, domID)
			//},
			contextMenu: null,
			useClientSort: true,
		    columns: [{}],
			
		}
		/* ================================================ */

		if("object" === typeof(summary))
		{
			gridObj.summary = summary;
		}
		
		
		let newGrid = new tui.Grid(gridObj)
		
		//2023-08-21, Kim CheolEon :: 필터 설정 시 x축 스크롤이 초기화되어, 변경한 필터로 스크롤 옮겨가도록 보정
		//newGrid.on('afterFilter', (evt) => {
		//	console.log(evt);
		//	evt.instance.focus(0, evt.columnName, true);
		//});
		
		//newGrid.on('onGridUpdated', function(evt){
		//	evt.instance.refreshLayout();
		//})
		
		
		//if(rowHeader == 'checkbox')
		//{
		//	// 편집중에 발생하지 않는 이벤트 : keydown
		//	newGrid.on('keydown', (evt) => {
		//		
		//		let keyCode = evt.keyboardEvent.code;
		//		// 셀 선택 후 Space 입력 시, 해당 row 체크 / 해제 
		//		if(keyCode == 'Space')
		//		{
		//			let row = newGrid.getFocusedCell();
		//			//getCheckedRowKeys() 를 사용하려 했으나, keydown 이벤트 시점이 리스트 갱신시점보다 빨라서 리스트가 이전시점 목록이 나옴.
		//			let checkStatus = newGrid.getRow(row.rowKey)._attributes.checked;
		//
		//			if(checkStatus)
		//			{
		//				newGrid.uncheck(row.rowKey);
		//			}
		//			else
		//			{
		//				newGrid.check(row.rowKey);
		//			}
		//		}
		//	})
		//}
		
		return newGrid;
	}
	
}

// 설정된 Context 를 반환하는 함수
function gfnToastGridCallContext( rowKey, columnName, gridID )
{
	//console.log(rowKey, columnName, domID);
	
	let contextMenu = [
		[
			{
				 name: "Init"
				 ,label: gridID
				 ,action: null
				 ,classNames: ['ContextMenuItem', 'Init']
			}
		],
		[
			{
				name: "Item1"
				,label: "Item1"
				,action: function(){
					//grid = (TOAST_GRID[gridID] ? TOAST_GRID[gridID] : (CONT_COMMON_GRID[gridID] ? CONT_COMMON_GRID[gridID] : null));
					grid = (typeof(TOAST_GRID) == 'undefined' ? CONT_COMMON_GRID[gridID] : TOAST_GRID[gridID])
					
					if(grid)
					{
						alert('셀 Data::[' + grid.getValue(rowKey, columnName) + "]")
					}
				}
				,clasNames: ['ContextMenuItem', 'Item1']
			},
			{
				name: "Item2"
				,label: "복사?"
				,action: function(){
					//grid = (TOAST_GRID[gridID] ? TOAST_GRID[gridID] : (CONT_COMMON_GRID[gridID] ? CONT_COMMON_GRID[gridID] : null));
					grid = (typeof(TOAST_GRID) == 'undefined' ? CONT_COMMON_GRID[gridID] : TOAST_GRID[gridID])					
					
					if(grid)
					{
						grid.copyToClipboard();
					}
				}
				,clasNames: ['ContextMenuItem', 'Item2']
			}
			
		]
	];
	
	return contextMenu;
}

// Context Item 에 연결할 샘플 함수 (Action)
function gfnToastGridContnext_1 (rowKey, columnName)
{
	console.log('Context1', rowKey, columnName);
}

function gfnToastGridContnext_2 (rowKey, columnName)
{
	console.log('Context2', rowKey, columnName);
}



// 숫자 콤마 처리
function gfnNumComma(value){
    let aValue;
    let result = "";
	
	//console.log("typeof(value) ==> " + typeof(value)+", value ==> " + value);
	if("number" == typeof(value)){
        if(value.toString().indexOf('.') < 0){ // 정수(음수, 양수)일 경우
            if(value.toString().indexOf('-') < 0) result = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 양수
            else result =  "-" + value.toString().substring(1).replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 음수
        }else{ // 소수
            aValue = value.toString().split(".");
            if(aValue[0].indexOf('-') < 0) result = aValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "." + aValue[1]; // 양의 소수
            else result =  "-" + aValue[0].substring(1).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "." + aValue[1]; // 음의 소수
        }
    }else{ // 숫자(실수)가 아닌 경우
        result = value;
	}
    return result;
}

function gfnAprisoKeydownUnbind()
{
	if(typeof( $(document) ) !== "undefined")
	{
		if($(document).length === 1)
		{
			$(document).unbind("keydown");
		}
	}
}

function gfnToastUIRefreshLayout(gridObj)
{
	if(typeof(gridObj) === "object")
	{
		let keys = Object.keys(gridObj);
		if(keys.length > 0)
		{
			keys.forEach(item => gridObj[item].refreshLayout())
		}
	}
}




function gfnBottomLayerReady(buttonConfig)
{
	//2023-05-16, KimCheolEon : 활성화 버튼 갯수가 1건 이상일 때, 하단 BOTTOM 에 style 지정
	let buttonValues = Object.values(buttonConfig);
	let activeCount = !buttonValues ? null : buttonValues.filter(item => item === true).length;
	if(activeCount > 0)
	{
		document.querySelector('#panel_BOTTOM').style.position = 'absolute';
		document.querySelector('#panel_BOTTOM').style.border = '1px solid black';
		
		document.querySelector('#panel_BOTTOM .Panel > .OperationContainer').style.overflow = 'hidden';
		
		gfnLinkSearchFormButton(CONT_BUTTON_CONFIG);
	}
	else
	{
		document.querySelector('#panel_CONTENT').style.bottom = '0px';
		document.querySelector('#panel_BOTTOM').style.height = '0px';
	}
}

function gfnBottomLayerFolding(folding)
{
	/*
		folding = true :: 접음
		folding = false :: 폄
	*/
	if(!folding)
	{
		CONT_BOTTOM_LAYER_SHOW = true;
		//document.querySelector('#panel_BOTTOM').style.height = '70%';
		document.querySelector('#panel_BOTTOM').style.height = '60%';
		
		
		gfnToastUIRefreshLayout(CONT_COMMON_GRID);
		
		document.querySelector('.btnLayerControll.UpButton').classList.remove('Active');
		document.querySelector('.btnLayerControll.DownButton').classList.add('Active');
	}
	else
	{
		CONT_BOTTOM_LAYER_SHOW = false;
		document.querySelector('#panel_BOTTOM').style.height = '40px';
		
		document.querySelector('.btnLayerControll.UpButton').classList.add('Active');
		document.querySelector('.btnLayerControll.DownButton').classList.remove('Active');
	}
}


//2023-05-16, KimCheolEon : 조회 상단 Apriso Button OnClick 비활성화, 새 함수 연결
//2023-06-16, KimCheolEon : 현재 모든 탭이 품번/업체 로 조회하기 때문에, 초기에 탭마다 입력이 다를 것이라는 가정을 변경 => 버튼 옵션 순환 삭제
function gfnLinkSearchFormButton(_ButtonConfig)
{
	//let obj = Object.entries(_ButtonConfig);
	let obj = Object.values(_ButtonConfig);
	let trueFind = null;
	if(obj.length > 0)
	{
		// 버튼 그룹에 true 로 활성화된 탭이 하나라도 있는지?
		trueFind = obj.indexOf(true);
	}
	
	// item 원소값이 -1 보다 크면 true 존재. (index 0부터 시작)
	if(trueFind > -1)
	{
		let btnProductSearch = document.querySelector('.Control.fc_BTN_ProductSearch button');
		!btnProductSearch ? null : btnProductSearch.removeAttribute('onclick');
		!btnProductSearch ? null : btnProductSearch.addEventListener("click", function(){
			let input = gProductNo;
			if(input)
			{
				gfnBottomLayerFolding(false);
				document.querySelector('#spnComProductNo input').value = input.value;
				document.querySelector('#spnComSearch button').click();
			}
		});
		
		let btnPartnerSearch = document.querySelector('.Control.fc_BTN_PartnerSearch button');
		!btnPartnerSearch ? null : btnPartnerSearch.removeAttribute('onclick');
		!btnPartnerSearch ? null : btnPartnerSearch.addEventListener("click", function(){
			let input = gPartnerNo;
			if(input)
			{
				gfnBottomLayerFolding(false);
				document.querySelector('#spnComPartnerNo input').value = input.value;
				document.querySelector('#spnComSearch button').click();
			}
		});
	}
	
	//for(let list of obj)
	//{
	//	if(list[1] === true)
	//	{
	//		let findButton;
	//		switch(list[0])
	//		{
	//			case "btnComSearch":
	//				findButton = document.querySelector('.Control.fc_BTN_ProductSearch button')
	//				!findButton ? null : findButton.removeAttribute('onclick');
	//				!findButton ? null : findButton.addEventListener("click", function(){ gfnComButtonAction("btnComSearch") });
	//				break;
	//			case "btnComInventoryBalance":
	//				findButton = document.querySelector('.Control.fc_BTN_PartnerSearch button')
	//				!findButton ? null : findButton.removeAttribute('onclick');
	//				!findButton ? null : findButton.addEventListener("click", function(){ gfnComButtonAction("btnComInventoryBalance") });
	//				break;
	//			case "btnComInventoryMaster":
	//				//findButton = document.querySelector('.Control.???')
	//				//!findButton ? null : findButton.removeAttribute('onclick');
	//				break;
	//			case "btnComMaterialMaster":
	//				//findButton = document.querySelector('.Control.???')
	//				//!findButton ? null : findButton.removeAttribute('onclick');
	//				break;
	//		}
	//	}
	//}
}

//2023-05-16, KimCheolEon : 새로 연결한 함수 (검색)
//2023-06-16, KimCheolEon : 상위 함수 gfnLinkSearchFormButton 에서 연결이 사라질 것
function gfnComButtonAction(type)
{
	//if(!CONT_BOTTOM_LAYER_SHOW)
	//{
		gfnBottomLayerFolding(false);
		
		let input = null
		switch(type)
		{
			case "btnComSearch":
				input = document.querySelector('.Control.fc_EXT_ProductNo_SC input');
				!input ? null : document.querySelector('#spnComProductNo input').value = input.value;
				gfnSetSearchType('ComSearch');
				break;
			case "btnComInventoryBalance":
				input = document.querySelector('.Control.fc_EXT_PartnerNo_SC input');
				!input ? null : document.querySelector('#spnComPartnerNo input').value = input.value;
				gfnSetSearchType('ComSearch');
				break;
			case "btnComInventoryMaster":
				break;
			case "btnComMaterialMaster":
				break;
		}
		
		document.querySelector('#spnComSearch button').click();
	//}
	//else
	//{
	//	gfnBottomLayerFolding(true);
	//}
}





// [공통] 조회조건 셋팅
function gfnSetComSearchConditions(reqType, gridID){
	let params = {};
	
	params.EXT_RequestType = reqType;
	
	let sub = {};
	sub.ScreenID   = CONT_REQUEST_CODE;
	sub.GridID     = gridID;
	sub.EmployeeNo = CONT_EMPLOYEE_NO;
	sub.LanguageID = CONT_LANGUAGE_ID;
	
    sub.Facility  = gFacility                 ? gFacility.value  : "";
    //sub.ProductNo = $("#EXT_COMProductNo_SC") ? $("#EXT_COMProductNo_SC").val() : "";
    //sub.PartnerNo = $("#EXT_COMPartnerNo_SC") ? $("#EXT_COMPartnerNo_SC").val() : "";
	
	sub.ProductNo = $(".COMProductNo") ? $(".COMProductNo").val() : "";
	sub.PartnerNo = $(".COMPartnerNo") ? $(".COMPartnerNo").val() : "";
	
	params.EXT_SearchConditionJSON = JSON.stringify(sub);
	
	return params;
}
//[공통] Toast Grid Header 셋팅 
function gfnSetComGridHeader(_data, _gridID){
	let data = _data;
	let code = _gridID;
	
	(--CONT_HEADER_COUNT);
//console.log("Header _data ::: " + JSON.stringify(_data));
	if(data && code){
		if(data.EXT_ResultJSONData){
			if(CONT_COMMON_GRID && CONT_COMMON_GRID[code]){
				CONT_COMMON_GRID[code].setColumns(JSON.parse(data.EXT_ResultJSONData));
			}
		}
	}
	
	if(CONT_HEADER_COUNT <= 0){
		$('.loadingLayer').hide();
		CONT_HEADER_COUNT = Object.keys(CONT_COMMON_GRID).length;
	}
}
//[공통] Toast Grid Data 셋팅 
function gfnSetComGridRow(_data, _gridID, optFunction){
	let data = _data;
	let code = _gridID;
	
	(--CONT_ROW_COUNT);
	//console.log("_data ::: " + JSON.stringify(_data));
	if(data && code){
		if(data.EXT_ResultJSONData){
			if(CONT_COMMON_GRID && CONT_COMMON_GRID[code]){			
				if("function" === typeof(optFunction)){
					optFunction(CONT_COMMON_GRID[code], data.EXT_ResultJSONData);
				}else{
					CONT_COMMON_GRID[code].resetData(JSON.parse(data.EXT_ResultJSONData));
					CONT_COMMON_GRID[code].resetOriginData();
				}
			}
		}else{
			//console.log("::::: NO DATA :::::" + JSON.stringify(_data));
			//alert('NO DATA');
			//빈 데이터 삽입
			//CONT_COMMON_GRID[code].resetData([{}]);
			CONT_COMMON_GRID[code].resetData([]);
			CONT_COMMON_GRID[code].resetOriginData();
		}
	}
	
	if(CONT_ROW_COUNT <= 0){
		//$('.loadingLayer').hide();
		//CONT_ROW_COUNT = Object.keys(CONT_COMMON_GRID).length;
		$('.loadingLayer').hide();
		
		// 현재 Active 된 화면의 카운트만 구하려는 의도.
		let gridID = []
		document.querySelectorAll('.Page.Active .tuiGrid').forEach(item => gridID.push(item.id))
		CONT_ROW_COUNT = gridID.length;
		
		/*
		let list = Object.keys(CONT_COMMON_GRID);
		let zeroCnt = 0;
		if(list.length > 0)
		{
			list.forEach(item => {
				if(CONT_COMMON_GRID[item].getData().length === 0) ++zeroCnt;
			})
			if(zeroCnt > 0)
			{
				alert('조회된 Data가 없습니다.');
			}
		}
		*/
	}
}
// [공통] Toast Grid Header 요청
async function gfnComHeaderRequest(){	
	$('.loadingLayer').show();
	
	const comHeadRequest = await Promise.allSettled([
        gfnRequestGridData(gfnSetComSearchConditions("HEADER", "ComMaterialList"), gfnSetComGridHeader),
        gfnRequestGridData(gfnSetComSearchConditions("HEADER", "ComPartnerList"), gfnSetComGridHeader),
        gfnRequestGridData(gfnSetComSearchConditions("HEADER", "ComInventoryBalanceList"), gfnSetComGridHeader),
        gfnRequestGridData(gfnSetComSearchConditions("HEADER", "ComInventoryMasterList"), gfnSetComGridHeader),
        gfnRequestGridData(gfnSetComSearchConditions("HEADER", "ComMaterialMasterList"), gfnSetComGridHeader),
		gfnRequestGridData(gfnSetComSearchConditions("HEADER", "ComInventoryPOList"), gfnSetComGridHeader),
    ]);
}
// [공통] Toast Grid Data 요청
async function gfnComRowRequest(){

	$('.loadingLayer').show();
	
	// 2023-05-19, Kim CheolEon : 활성화된 버튼과 활성화된 페이지의 매칭이 올바를 때, 페이지 하위의 Grid 만 요청보내도록 변경.
	let activePage = document.querySelector('.Page.Active');
	let activeButton = document.querySelector('.PageButton.Active');
	
	if(activePage && activeButton)
	{
		if(activePage.getAttribute("page") === activeButton.getAttribute("page"))
		{
			let childGrid = activePage.querySelectorAll('.tuiGrid');
			let gridID = [];
			childGrid.forEach(item => gridID.push(item.id));
			
			//ROW COUNT (로딩바 없애기) 를 갱신
			CONT_ROW_COUNT = gridID.length;
			
			const comRowRequest = await Promise.allSettled([
				//재고Balance 정보 조회 Ajax
				//fnGetInventoryBalanceInfo(_Context),
    		    gridID.includes('ComMaterialList') ? gfnRequestGridData(gfnSetComSearchConditions("ROW", "ComMaterialList"), gfnSetComGridRow) : null,
    		    gridID.includes('ComPartnerList') ? gfnRequestGridData(gfnSetComSearchConditions("ROW", "ComPartnerList"), gfnSetComGridRow) : null,
    		    gridID.includes('ComInventoryBalanceList') ? gfnRequestGridData(gfnSetComSearchConditions("ROW", "ComInventoryBalanceList"), gfnSetComGridRow) : null,
				gridID.includes('ComInventoryBalanceList') ? gfnOEMRequestInventoryBalanceInfo() : null,
    		    gridID.includes('ComInventoryMasterList') ? gfnRequestGridData(gfnSetComSearchConditions("ROW", "ComInventoryMasterList"), gfnSetComGridRow) : null,
    		    gridID.includes('ComMaterialMasterList') ? gfnRequestGridData(gfnSetComSearchConditions("ROW", "ComMaterialMasterList"), gfnSetComGridRow) : null,
				gridID.includes('ComInventoryPOList') ? gfnRequestGridData(gfnSetComSearchConditions("ROW", "ComInventoryPOList"), gfnSetComGridRow) : null,
				gridID.includes('ComInventoryPOList') ? gfnOEMRequestInventoryPOInfo() : null,
    		]);
		}
	}
	else
	{
		$('.loadingLayer').hide();
	}
}
// 공통 Button 셋팅
function gfnSetComButton(){
	// 버튼 활성/비활성 처리
	if(CONT_BUTTON_CONFIG){
		for(key in CONT_BUTTON_CONFIG){
			//console.log("key : ", key, ", value :" + CONT_BUTTON_CONFIG[key]);
			//if(CONT_BUTTON_CONFIG[key]) $("#"+key).show();
			//else $("#"+key).hide();
			if(CONT_BUTTON_CONFIG[key]) $("#"+key).addClass("Enabled");
		}
	}
	
	// 2023-05-18, KimCheolEon : 활성화된 버튼(Enabled) 중, 첫번째 항목(BUTTON_CONFIG 기준))에 Active
	let enabledList = document.querySelectorAll('.btnComDiv .Enabled');
	if(enabledList.length > 0)
	{
		let activeButton = enabledList[0];
		activeButton.classList.add('Active');
		
		let getPage = activeButton.getAttribute('page');
		let linkPage = document.querySelector("".concat('.Page[page="', getPage, '"]'))
		if(linkPage) linkPage.classList.add('Active');
	}
	// 2023-05-17, Kim CheolEon : BottomLayer 세팅
	gfnBottomLayerReady(CONT_BUTTON_CONFIG);
}
// 공통 담당자 설정
function gfnSetControllerType(){
	//if(gControllerType){
	//	let oSelect = $(".Control.fc_EXT_ControllerType_SC select");
	//	let iCnt    = $(".Control.fc_EXT_ControllerType_SC select option").size();
	//	let bFlag   = false;
	//	//console.log("oSelect : ", oSelect);
	//	//console.log("iCnt : ", iCnt);
	//		
	//	for(let i = 0; i < iCnt; i++){	
	//		// 전체는 삭제하지 않음(bFlag = true;)
	//		if(oSelect.find("option:eq("+i+")").val() != ""){
	//			bFlag = false;
	//			
	//			for(key in CONT_CONTROLLER_TYPE){
	//			//console.log("key : ", key, ", value :" + CONT_CONTROLLER_TYPE[key]);
	//				if(!bFlag && oSelect.find("option:eq("+i+")").val() == key && CONT_CONTROLLER_TYPE[key]) bFlag = true;
	//			}
	//			
	//			//console.log("bFlag : ", bFlag);
	//			if(!bFlag) oSelect.find("option:eq("+i+")").remove();
	//		}
	//	}
	//}
	
	let type = gControllerType;
	//let code = gControllerCode;
	let objValues = Object.values(CONT_CONTROLLER_TYPE);
	
	// type, code DOM 이 존재하고 CONTROLLER_TYPE 의 value 가 true 가 존재할 경우 수행 시작
	//if(type && code && objValues.indexOf(true) > -1)
	if(type && objValues.indexOf(true) > -1)
	{
		let objKeys = Object.keys(CONT_CONTROLLER_TYPE);
		
		// last 외에 value 가 없을 경우 를 제외하고 싶다면, 아래의 selector 사용 / 같이 조건 넣을때 쉼표.
		// option:not([value=""])
		let typeItems = type.querySelectorAll('option:not(:last-child)');
		for(item of typeItems)
		{
			// true 일 경우, 사용하겠다는 의미 => true가 아닐 때 remove 해야함
			if(!CONT_CONTROLLER_TYPE[item.value])
			{
				item.remove();
			}
			//CONT_CONTROLLER_TYPE[item.value] ? item.remove() : null;
		}
	}
}
// [공통] Button 클릭시 그리드 활성/비활성 처리
function gfnSetSearchType(_searchType){
//console.log("_searchType : ", _searchType);
	// 버튼 활성/비활성 처리
	//let page;
	//if(CONT_COMMON_GRID){
	//	for(key in CONT_COMMON_GRID){
	//		//console.log("key : ", key, ", value :" + CONT_COMMON_GRID[key]);
	//		page = $(".Page ."+key);
	//		page.removeClass("Active");
	//	}
	//	
	//	//if(_searchType == "ComSearch"){
	//	//	$("#ComMaterialList").addClass("Active");
	//	//	$("#ComPartnerList").addClass("Active");
	//	//	CONT_COMMON_GRID["ComMaterialList"].refreshLayout();
	//	//	CONT_COMMON_GRID["ComPartnerList"].refreshLayout();
	//	//}else{
	//	//	$("#"+_searchType).addClass("Active");
	//	//	CONT_COMMON_GRID[_searchType].refreshLayout();
	//	//}
	//}
	
	$('.ToastUI-COM-GridGroup .Page').removeClass("Active");
	$('.Page.' + _searchType).addClass("Active");
	
	$('.btnComDiv .PageButton').removeClass("Active");
	$('.PageButton.' + _searchType).addClass("Active");
	
	if(!CONT_BOTTOM_LAYER_SHOW)
	{
		gfnBottomLayerFolding(false);
	}
	
	gfnToastUIRefreshLayout(CONT_COMMON_GRID);
}
// [공통] 조회조건 체크
function gfnComVaildCheck(){
	// 조회조건 체크
	if(!$("#EXT_COMProductNo_SC").val()){
		alert(_Context.literals.DI_ERR_ProductNo);
		$("#EXT_COMProductNo_SC").focus();
		return false;
	}
	return true;
}


function gfnSnackBarInit()
{
	let portal = document.querySelector('#Portal');
	if(portal)
	{
		let initTemp = document.querySelector('#SnackBarInit');
		let copy = document.importNode(initTemp.content, true);
		
		let copyRoot = copy.querySelector('#SnackBarViewFrame');
		//copyRoot.setAttribute("max", CONT_SNACK_BAR_MAX);
		
		portal.appendChild(copy);
		
		CONT_SNACK_BAR = copyRoot;
	}
}

/*
	action :: ERROR(빨강), INFO(파랑), SUCCESS(초록), WARNING(노랑) 소문자 가능(upper 처리함)
	message :: 내부 텍스트
	type :: null(a or A) / m or M(클릭해야 사라짐)
	time :: default 2초
	
	샘플)
  gfnShowSnackBar('error', 'TEST입니다')  // 자동 2초 후 사라짐
  gfnShowSnackBar('warning', 'TEST입니다', 'a', 5000) // 자동, 5초 지정
  gfnShowSnackBar('info', 'TEST입니다', 'm') // 수동으로 클릭해야 사라짐
  gfnShowSnackBar('success', 'TEST입니다', 'm', 2000)  //2000 파라미터 버려짐.(수동클릭)
*/
function gfnShowSnackBar(action, message, type, time)
{
	if(CONT_SNACK_BAR)
	{
		//밑에서 위로 이동 :: 해제 후 현재 새로 생성되는 메시지는 출력시키려고.
		gfnReleaseSnackBar();
		
		let initTemp = document.querySelector('#SnackBarContent');
		let copy = document.importNode(initTemp.content, true);
		
		let copyRoot = copy.querySelector('div.MessageBody');
		
		let iconTag = copyRoot.querySelector(".Icon");
		let textTag = copyRoot.querySelector(".Text");
		
		
		let _action = action.toUpperCase();
		switch(_action)
		{
			case "ERROR":
				iconTag.classList.add('fa', 'fa-times-circle');
			break;
			
			case "INFO":
				iconTag.classList.add('fa', 'fa-info-circle');
			break;
			
			case "SUCCESS":
				iconTag.classList.add('fa', 'fa-check-circle');
			break;
			
			case "WARNING":
				iconTag.classList.add('fa', 'fa-exclamation-triangle');	
			break;
			
			default:
				iconTag.classList.add('fa', 'fa-meh-o');
			break;
		}
		//textTag.textContent = message;
		textTag.innerHTML = message;
		copyRoot.classList.add(_action, "Activation");
		
		type = type ? type : '';
		if(type && (type === "m" || type === "manual" || type === "M" || type === "MANUAL"))
		{
			copyRoot.addEventListener('click', function(){
				let _this = this;
				_this.classList.remove("Activation");
				_this.classList.add("DeActivation");

				//애니메이션 실행 후 타이머로 자신을 삭제
				setTimeout(function() {
					_this.remove();
				}, 600)
			})
		}
		else
		{
			let setTime = Number.isNaN(Number(time)) ? 2000 : time;

			const self = new Promise((resolve, reject) => {
			    setTimeout(() => {
					copyRoot.classList.remove("Activation");
					copyRoot.classList.add("DeActivation");
					
					resolve();
				}, setTime)
			});
			
			self.then(()=> {
			  	setTimeout(function() {	
					copyRoot.remove();
				}, 600)
			});
		}
		
		if("ERROR" === _action) document.querySelector('.ErrorBeepSound').play();
		CONT_SNACK_BAR.prepend(copyRoot);
		
		//gfnReleaseSnackBar();
	}
}

function gfnReleaseSnackBar()
{
	if(CONT_SNACK_BAR)
	{
		let active = CONT_SNACK_BAR.querySelectorAll('.Activation');
		if(active.length > CONT_SNACK_BAR_MAX)
		{
			active[active.length-1].remove();
			gfnReleaseSnackBar(); //재귀
		}
		//else if(CONT_SNACK_BAR.clientHeight > window.innerHeight)
		//{
		//	active[active.length-1].remove();
		//	gfnReleaseSnackBar(); //재귀
		//}
		else
		{
			return;
		}
	}
	else
	{
		return
	}
}


//https://docs.sheetjs.com/docs/getting-started/example
// SheetJS 반드시 필요함.
// dataObj 안의 데이터 객체를 시트 명과 일치시킬것. 반복문으로 시트목록만큼 순환하며 data[시트명] 방식으로 찾아옴 
// DIOEM_HV_MM_MANAGER_CHANGE_EXCEL_IMPORT_POPUP_VIEW  <= 참고
function gfnExcelDownloadWithSheetJS(fileName, sheetList, dataObj)
{
	let _fn = fileName ? fileName : "ExcelDownload.xlsx";
	let _sl = sheetList;
	
	if(_sl.length > 0)
	{
		let book = XLSX.utils.book_new();
		
		for(let i = 0; i < _sl.length; i++)
		{
			let sheet = _sl[i];
			let data = XLSX.utils.aoa_to_sheet(dataObj[sheet]);
			
			if(data)
			{
				XLSX.utils.book_append_sheet(book, data, sheet);
			}
		}	
		XLSX.writeFile(book, _fn);
	}
}


function gfnTuiGridInfo()
{
	let info = {};
	
	if(typeof(TOAST_GRID) != 'undefined')
	{
		if(TOAST_GRID)
		{
			let tuiGridList = Object.keys(TOAST_GRID);
			if(tuiGridList.length)
			{
				for(let i = 0; i < tuiGridList.length; i++)
				{
					// 개별 Grid 만큼 찾아서 처리
					info[tuiGridList[i]] = {
						 RowCount : TOAST_GRID[tuiGridList[i]].getRowCount()
						,FocusedCell : TOAST_GRID[tuiGridList[i]].getFocusedCell()
					}
				}
			}
		}
	}
	return info
}


// 2023-09-18, Kim CheolEon : 순서 상관없는 배열 비교
function gfnArrayEqualCheck(arr1, arr2)
{
	arr1.sort();
	arr2.sort();
	
	return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}

//###############################################################################################################//
//###############################################################################################################//
//###############################################################################################################//
//###############################################################################################################//
//###############################################################################################################//

/*
[Apriso] – changed to "<drive>\Program Files\Dassault Systemes\DELMIA Apriso 2019\WebSite\Portal" in runtime
[AprisoStyles] – changed to "<drive>\Program Files\Dassault Systemes\DELMIA Apriso 2019\WebSite\Portal\Styles\[CurrentTheme]" in runtime (where [CurrentTheme] represents the theme used by the logged-in user)
[AprisoScripts] – changed to "<drive>\Program Files\Dassault Systemes\DELMIA Apriso 2019\WebSite\Portal\Scripts" in runtime
*/

/* CSS 탭에서는 [AprisoScripts]가 안읽힘 */


/* ************************************* 외부 Library(CSS) 호출 :: START ************************************* */
<link rel="stylesheet" type="text/css" media="screen" href="[Apriso]/Scripts/ACUSTOM/ToastUI/tui-date-picker/dist/tui-date-picker.css" />
<link rel="stylesheet" type="text/css" media="screen" href="[Apriso]/Scripts/ACUSTOM/ToastUI/tui-pagination/dist/tui-pagination.css" />
<link rel="stylesheet" type="text/css" media="screen" href="[Apriso]/Scripts/ACUSTOM/ToastUI/tui-grid/dist/tui-grid.css" />
/* ************************************* 외부 Library(CSS) 호출 :: E N D ************************************* */

#UIRenderer { font-size: 0.9rem; }
#ContentPane .FIContentPanel { overflow-y: hidden; }

#panel_BOTTOM { z-index: 99; background-color: white !important; }

.FormContainer .Form,
.FormContainer .Form tbody,
.FormContainer .Form tbody tr
{
	width: 100%;
}

.FormContainer .Form tbody tr
{
	display: flex;
	align-items: center;
}

.Control.fc_BTN_SEARCH button,
.Control.fc_BTN_Search button,
.Control.fc_BTN_PopupSearch button
{
	width:80px;
	font-size:1em;
	transition-duration:0.3s;
	display:inline;
	transform:perspective(1px) translateZ(0px);
	box-shadow:inset 0px 0px 0px 4px #2098d1, 0px 0px 1px rgba(0,0,0,0);
}

.Label.fl_EMPTY
{
	display: none;
}

.Label.fl_HIDDEN:after
{
	content: "" !important;
}


td.Control input.InvalidData
{
	border: 1px solid #EA4F37 !important;
}
td.Control input.InvalidData:hover
{
	border: 1px solid #EA4F37 !important;
}
td.Control input.InvalidData:active
{
	border: 1px solid #EA4F37 !important;
}



/* 2023-03-27 Kim CheolEon, 검색부 공통Form 명칭 갖추기 전에 형태가 동일한 Form 의 Control 폭 조정
MM4100 ~ MM4106
*/
#panel_SEARCH-PANEL .FormContainer .Form .Control.fc_EXT_ProductNo_SC
, #panel_SEARCH-PANEL .FormContainer .Form .Control.fc_EXT_PartnerNo_SC
{
	width: 7rem;
}

#panel_SEARCH-PANEL .FormContainer .Form .Control.fc_EXT_ProductName_SC
, #panel_SEARCH-PANEL .FormContainer .Form .Control.fc_EXT_PartnerName_SC
{
	width: 12rem;
}



/* *************************** LoadingLayer CSS :: START *************************** */
.loadingLayer
{
    width: 100%;  
	height: 100%;  
	top: 0px;
	left: 0px;
	position: fixed;  
	display: block;  
	opacity: 0.5;  
	background-color: #fff;  
	z-index: 200;  
	text-align: center; 
}
.loader {
  position: absolute;
  left: calc(50% - 16px);
  top: calc(50% - 16px);
  z-index: 199;
  width: 50px;
  height: 50px;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}
/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* *************************** LoadingLayer CSS :: E N D *************************** */



/* *************************** ToastUI CSS :: START *************************** */
/*
[기본 예제]
<div class="ToastUI-MainView">
	<div class="ToastUI-Container">
		<div class="ToastUI-ButtonGroup">
			<button type="button" onclick="gfnTuiExcelExport(TOAST_GRID, GRID_GROUP)" class="Button ExcelExport"><i class="fa fa-download" aria-hidden="true" style="font-weight:bold;"></i></button>
			<button type="button" onclick="gfnTuiFilterClear(TOAST_GRID, GRID_GROUP)" class="Button FilterClear">{@DI_COL_FilterClear:text}<i class="fa fa-magic" aria-hidden="true" style="font-weight:bold;"></i></button>
		</div>
		<div class="ToastUI-GridGroup">
			<div id="InventoryBalanceList" class="tuiGrid InventoryBalanceList Active"></div>
		</div>
	</div>
</div>
*/

.ToastUI-MainView 
{ 
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	
    box-sizing: border-box;
}

.ToastUI-Container
{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
	
	padding: 0.5em;
	box-sizing: border-box;
}

.ToastUI-ButtonGroup
{
	/* 구버전에서 flex + justify-flex 동작 안해서 변경 */
	/*
	display: flex;
	justify-content: end;
	width: 100%;
	*/
	/*
	margin-left: auto;
	*/
	padding-bottom: 0.5em;
	text-align: right;
}

.ToastUI-ButtonGroup .Button
{
	/* Apriso Grid Toolbox Button Style */
	height: 2em;
    display: inline-block;
    vertical-align: middle;
    margin: 0 0 0 0.2em;
    width: auto;
    /*float: left;*/
	
	font-weight: bold;
}

.ToastUI-GridGroup
{
	width: 100%;
	height: 100%;
	box-sizing: border-box;
}

.ToastUI-GridGroup .tuiGrid:not(.Active)
{
	display: none;
}

.ToastUI-SubGroup
{
	box-sizing: border-box;
}

/* *************************** ToastUI CSS :: E N D *************************** */





div.Bottom-Search-Layer
{
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
}

.btnLayerControll:not(.Active) {
	display: none;
}


/* common button */
/*** 커서 포인터  ***/
.PageButton { cursor:pointer; padding-bottom: 3px; }
.PageButton:not(.Enabled) { display: none; }
.PageButton.Enabled.Active { border-bottom: 3px solid black; }
.PageButton.Enabled:not(.Active) { border-bottom: 3px solid transparent; }
.btnComDiv	{
	width: 100%; 
	height: 40px;  
	margin: 0 auto;
	display: flex;
    justify-content: center;
    align-items: center;
	background-color: #fff;  
	z-index: 300;  
	text-align: center; 
	
	background-color: #E6F3FF;
}
.btnComDiv span{
	margin: auto 1% auto 1%;
}

/*
.btnComDiv > span:first-child { margin-left: auto; }
.btnComDiv > span:last-child { margin-left: auto; }
*/
.btnComDiv > .btnWrapper
{
	position: absolute;
    right: 0;
}


/* common ToastUI */
.ToastUI-COM-MainView { 
	display: flex;
	flex-direction: column;
	width: 100%;
	height: calc(100% - 40px);
	/*height: calc(100% - 40px);*/
	background-color: #fff;  
	
    box-sizing: border-box;
}

.ToastUI-COM-Container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
	
	padding: 0.5em;
	box-sizing: border-box;
}
.ToastUI-COM-SearchGroup {
    width: auto;
    /*float: center;*/
	display: flex;
    justify-content: center;
    align-items: center;
	padding-bottom: 0.5em;
	/*margin: auto 1% auto 1%;*/
}

.ToastUI-COM-SearchGroup span:not(:first-child) {
	margin-left: 15px;
}
.ToastUI-COM-SearchGroup .Button {
	height: 2em;
    display: inline-block;
    vertical-align: baseline;
    margin: 0 0 0 0.5em;
    width: auto;
    float: center;
}
.ToastUI-COM-GridGroup{
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	
	display: flex;
}
/*
.	 .tuiGrid:not(.Active){
	display: none;
}
*/
.ToastUI-COM-GridGroup .Page { width: 100%; height: 100%; }
.ToastUI-COM-GridGroup .Page:not(.Active){
	display: none;
}

.Page.ComSearch > .ComMaterialList {
    position: absolute;
	width: 75%;
	height: 100%;
	left: 0;
	box-sizing: border-box;
}
.Page.ComSearch > .ComPartnerList {
    position: absolute;
	width: 25%;
	height: height: 100%;
	right: 0;
	box-sizing: border-box;
}


.Page.ComInventoryBalanceList { display: flex; height: calc(100% - 40px); }
.Page.ComInventoryBalanceList > div { display: block; }

.Page.ComInventoryBalanceList > .ComInventoryBalanceList { width: 69%; height: calc(100% - 40px); margin-right: 1%; }
.Page.ComInventoryBalanceList > .BalanceInfo { width: 30%; /*height: calc(100% - 40px);*/ overflow: auto; }

.Page.ComInventoryBalanceList > .BalanceInfo div:not(:last-child) { margin-bottom: 10px; }
.Page.ComInventoryBalanceList > .BalanceInfo div span { display: inline-block; width: 40%; text-align: right; }
.Page.ComInventoryBalanceList > .BalanceInfo div input { width: 58%; opacity: 1 !important; }





.Page.ComInventoryPOList { display: flex; height: calc(100% - 40px); }
.Page.ComInventoryPOList > div { display: block; }

.Page.ComInventoryPOList > .ComInventoryPOList { width: 69%; height: calc(100% - 40px); margin-right: 1%; }
.Page.ComInventoryPOList > .WipOrderInfo { width: 30%; /*height: calc(100% - 40px);*/ overflow: auto; }

.Page.ComInventoryPOList > .WipOrderInfo div:not(:last-child) { margin-bottom: 10px; }
.Page.ComInventoryPOList > .WipOrderInfo div span { display: inline-block; width: 40%; text-align: right; }
.Page.ComInventoryPOList > .WipOrderInfo div input { width: 58%; opacity: 1 !important; }


/*
	2023-05-25, Kim CheolEon : Primary / 붉은 버튼 등이 Grid 버튼과 혼동여지가 있어서
				예전 2,3 차 즈음 정의된 CSS 컬러 시트를 참고하여 커스텀 class 및 색상을 이용
*/
.DynamicGrid .Toolbox .ToolButton.bgColRed { background-color: #fe8c82; }
.DynamicGrid .Toolbox .ToolButton.bgColDade { background-color: #63dfba; }



/* TEST */
.ContextMenuItem.Init { pointer-events: none; }


/*
.Page.ComInventoryBalanceList > .ComInventoryBalanceList 
{
    position: absolute;
	width: 75%;
	height: 98%;
	left: 0;
	box-sizing: border-box;

}
.Page.ComInventoryBalanceList > .BalanceInfo 
{
    position: absolute;
	width: 25%;
	height: 98%;
	right: 0;
	box-sizing: border-box;
}
*/


/* =============================================================================
	Jquery Diaolog CSS
   ============================================================================= */ 
.InitCustomModalDialog .ui-dialog-titlebar
{
	font-size: 1.4rem !important;
    font-weight: bold !important;
	padding: 0.4em !important;
}

.InitCustomModalDialog .ui-dialog-content
{
	text-align: center;
	font-size: 1.4rem;
}

.InitCustomModalDialog .ui-dialog-buttonset button
{
	font-size: 1rem;
	display: inline-block !important;
	width: auto !important;
	margin: 0 0 0 0.5em !important;
}

.InitCustomModalDialog .ui-dialog-buttonset button
/*, .InitCustomModalDialog .ui-dialog-buttonset button span*/
{
	padding: 0 !important;
}

/*button.CustomModalButton.Primary { background-color: #368EC4 !important; }*/
button.CustomModalButton.Secondary 
{ 
	color: #3D3D3D !important;
	border-color: #B4B6BA !important;
	background-color: #F1F1F1 !important;
}	
button.CustomModalButton.Secondary:hover
{
    color: #3D3D3D !important;
    border-color: #77797C !important;
    background-color: #E2E4E3 !important;
}

/* =============================================================================
	SnackBar CSS
   ============================================================================= */ 

#SnackBarViewFrame {
	display:flex;
	justify-content:center;
	z-index: 9999;
	
	flex-direction: column;
	align-items: center;
	padding: 1rem;
}


#SnackBarViewFrame > div:not(:first-Child) { margin-top: 0.5rem; }
#SnackBarViewFrame .MessageBody {
	min-width: 40%;
    max-width: 90%;
	
	border-radius: 2px;
	padding: 12px;
	z-index: 9998;
	
	display: flex; 
	align-items: center;

	color: black;
	border-width: 0 0 0 5px;
	border-style: solid;
	border-radius: 4px;
	background-image: none!important;
	box-shadow: 0 1px 3px 1px rgb(0 0 0 / 30%);
}

#SnackBarViewFrame .MessageBody.ERROR   { background-color: #FFF0EE; border-color: #EA4F37; color: #EA4F37; }
#SnackBarViewFrame .MessageBody.INFO    { background-color: #F2F5F7; border-color: #00B8DE; color: #00B8DE; }
#SnackBarViewFrame .MessageBody.SUCCESS { background-color: #EDF6EB; border-color: #57B847; color: #57B847; }
#SnackBarViewFrame .MessageBody.WARNING { background-color: #FFF3E9; border-color: #E87B00; color: #E87B00; }

#SnackBarViewFrame .MessageBody .Icon {
	font-style:normal;
	margin-right: 0.5rem;
	font-size: 1.3rem;
}
#SnackBarViewFrame .MessageBody .Text {
	word-break:break-word;
	color: black;
	font-size: 1rem;
}



#SnackBarViewFrame .MessageBody.Activation {
  animation: SnackbarFadein 0.5s;
  -moz-animation: SnackbarFadein 0.5s; /* Firefox */
  -webkit-animation: SnackbarFadein 0.5s; /* Safari and Chrome */
  -o-animation: SnackbarFadein 0.5s; /* Opera */
  
  animation-fill-mode: forwards;
}

#SnackBarViewFrame .MessageBody.DeActivation {
  animation: SnackbarFadeout 0.5s;
  -moz-animation: SnackbarFadeout 0.5s; /* Firefox */
  -webkit-animation: SnackbarFadeout 0.5s; /* Safari and Chrome */
  -o-animation: SnackbarFadeout 0.5s; /* Opera */
  
  animation-fill-mode: forwards;
}

@keyframes SnackbarFadein {
  from {opacity: 0;}
  to {opacity: 1;}
}
@keyframes SnackbarFadeout {
  from {opacity: 1;}
  to {opacity: 0;}
}

@-webkit-keyframes SnackbarFadein {
  from {opacity: 0;} 
  to {opacity: 1;}
}
@-webkit-keyframes SnackbarFadeout {
  from {opacity: 1;} 
  to {opacity: 0;}
}

@-moz-keyframes SnackbarFadein {
  from {opacity: 0;}
  to {opacity: 1;}
}
@-moz-keyframes SnackbarFadeout {
  from {opacity: 1;}
  to {opacity: 0;}
}

@-o-keyframes SnackbarFadein {
  from {opacity: 0;}
  to {opacity: 1;}
}
@-o-keyframes SnackbarFadeout {
  from {opacity: 1;}
  to {opacity: 0;}
}




.cust-container {
  display: block;
  position: relative;
  
  /*
  margin-bottom: -12px;
  margin-left: 3px;
  */
  
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.cust-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.cust-checkmark {
  position: absolute;
  top: -12px;
  /*left: 5px;*/
  margin-left: -12px;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.cust-container:hover input ~ .cust-checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.cust-container input:checked ~ .cust-checkmark {
  background-color: #2196F3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.cust-checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.cust-container input:checked ~ .cust-checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.cust-container .cust-checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}