<div style="width:100%; height:100%;">
    <div id="myDiagramDiv" style="width:100%; height:100%; background-color: #DAE4E4;"></div>
</div> 
<script>
var CON_CONTEXT;
var CON_WT_TITLE = $Context.literals.WaitTimeTitle;
var CON_MT_TITLE = $Context.literals.MoveTimeTitle;	

// 화면로드시 처리
$Context.view.onLoaded(function() {
	CON_CONTEXT = $Context;
	// preview 셋팅
	initDagreLayout();
});
</script>
/* Here you can type your JavaScript functions which you can use in HTML Editor. Press F1 for help. */
<script src="[AprisoScripts]/ACUSTOM/d3.min.js"></script>
<script src="[AprisoScripts]/ACUSTOM/dagre.min.js"></script>

// preview 셋팅
function initDagreLayout(){
	var zoomk = 1;
	
	var width  = $("#myDiagramDiv").width();
    var height = $("#myDiagramDiv").height();

	var rectWidth  = 250;
	var rectHeight = 120;
	var colSpace   = 80;
	var rowSpace   = 50;
	var colMargin  = 20;
	var rowMargin  = 20;

	// 화면에 출력할 데이터 조회
	var bg = buildDagreData();
	//console.log("bg : " + JSON.stringify(bg));
	var dagreg     = bg.dagre;
	var nodeGroups = bg.groups;
	var nodeLinks  = bg.links;
	
	var dagregWidth = parseInt(dagreg._label.width);
	var dagregHeight = parseInt(dagreg._label.height);
	
	//console.log(dagregWidth +',' +dagregHeight);
	
	//$("#myDiagramDiv").append('<div id="popups"></div>');
	//Create an SVG element and append it to the DOM
	var svg = d3.select("#myDiagramDiv")
		.append("svg")
		.attr("width",  dagregWidth  < width  ? width: dagregWidth)
		.attr("height", dagregHeight < height ? height: dagregHeight)
		.attr("id", "myDiagramDiv_svg");
	
	var nodesg = svg.append("g")
		.classed("nodes", true);
	var linksg = svg.append("g")
		.classed("links", true);
	var nodegroupsg = svg.append("g")
		.classed("nodegroups", true);
	
	//console.log("*****************************************");	
	
	zoom = d3.zoom().scaleExtent([0.1,100])
					.on('zoom', function() {
						d3.selectAll("#myDiagramDiv_svg > g").attr("transform", d3.event.transform);
						zoomK = d3.event.transform.k; //zoom factor
					});

	dagreg.nodes().forEach(function(v) {
	//     console.log("Node " + v + ": " + JSON.stringify(dagreg.node(v)));
		var node = dagreg.node(v)
		if(node != null){
		 	drawNode(node.x, node.y, node.width, node.height, node.data);
		}
	});
	dagreg.edges().forEach(function(e) {
	//    console.log("Edge " + e.v + " -> " + e.w + ": " + JSON.stringify(dagreg.edge(e)));
		var edge = dagreg.edge(e);
		drawNodeEdge(edge, e.v, e.w, nodeLinks);
	});
	
	// 그룹 그리기(사용안함)-외곽선 그리기 오류
	for(var i = 0; i < nodeGroups.length; i++){
		drawGroups(nodeGroups[i], dagreg);
	}
	
	if((dagregWidth > width || dagregHeight > height) && dagregWidth > 0 && dagregHeight>0  ){
		var zoomk = Math.min(width/dagregWidth, height/dagregHeight)
		var transform = d3.zoomIdentity.translate(0, 0).scale(zoomk);
		
		svg.call(zoom)	
		   .call(zoom.transform, transform);
	}else{
		svg.call(zoom);	
	}
	d3.select("#myDiagramDiv_svg").attr("width",  width)
						          .attr("height", height);	
	$("#myDiagramDiv").css("width", width)
	                  .css("height", height);	
}

// 화면에 출력할 데이터 조회
function buildDagreData(){
	// Create a new directed graph 
	var g = new dagre.graphlib.Graph();

	// Set an object for the graph label
	g.setGraph({
		rankdir: "LR",
		align: "UL",
		marginx: 50,
		marginy: 50,
		nodesep: 50,
		ranksep: 50,
		edgesep: 50,
		ranker: "longest-path"
	});

	// Default to assigning a new object as a label for each new edge.
	g.setDefaultEdgeLabel(function() { return {}; });

	// 노드 그룹 정보(setNode 포함)
	var groupArray = buildDagreNodes(g);
	
	// 노드 연결 정보(setEdge 포함)
	var links = builtDagreEdge(g);
	dagre.layout(g);
	
	return {
		"dagre" : g,
		"links" : links,
		"groups": groupArray
	}
}

// 노드 그룹 정보(setNode 포함)
function buildDagreNodes(g){
	var rectWidth          = 250;
	var rectHeight         = 120;
	var nodeDataArray      = new Array();
	var critical           = false;	
	var groupNodeDataArray = new Array();
	var tmpGroup           = "";
	var tmpFromWorkCenter  = "";
		
	for(var i = 0; i < CON_CONTEXT.inputs.FromWorkCenter.length; i++){
		if(tmpGroup != CON_CONTEXT.inputs.FromWorkCenter[i].substr(0, 1)){		
			tmpGroup = CON_CONTEXT.inputs.FromWorkCenter[i].substr(0, 1);
			groupNodeDataArray.push(tmpGroup);
		}
		if(tmpFromWorkCenter != CON_CONTEXT.inputs.FromWorkCenter[i]){
			tmpFromWorkCenter      = CON_CONTEXT.inputs.FromWorkCenter[i];
			var key                = CON_CONTEXT.inputs.FromWorkCenter[i];
			var Description        = CON_CONTEXT.inputs.FromWorkCenterName[i];
			var FromWorkCenter     = CON_CONTEXT.inputs.FromWorkCenter[i];
			var FromWorkCenterName = CON_CONTEXT.inputs.FromWorkCenterName[i];
			var ToWorkCenter       = CON_CONTEXT.inputs.ToWorkCenter[i];
			var FromStartTime      = CON_CONTEXT.inputs.FromStartTime[i];
			var FromEndTime        = CON_CONTEXT.inputs.FromEndTime[i];
			var FromTaktTime       = CON_CONTEXT.inputs.FromTaktTime[i];
			var FromMoveTime       = CON_CONTEXT.inputs.FromMoveTime[i];
			var FromWaitTime       = CON_CONTEXT.inputs.FromWaitTime[i];
			var WorkCenterLinkYn   = CON_CONTEXT.inputs.WorkCenterLinkYn[i];
			var FromProductionLine = CON_CONTEXT.inputs.FromProductionLineNo[i];
			var FromColor          = CON_CONTEXT.inputs.FromColor[i];
			var FromWaitWipCount   = CON_CONTEXT.inputs.FromWaitWipCount[i];
			var nodeData={
				key: 	        key,
				group: 	        tmpGroup,
				Description:	Description,
				ConsumePoint:	"X",
				WorkCell:	    "",			
				critical:       critical,
				fromWC:         FromWorkCenter,
				fromWCNm:       FromWorkCenterName,
				toWC:           ToWorkCenter,
				fromST:         FromStartTime,
				fromET:         FromEndTime,
				fromTT:         FromTaktTime,
				fromMT:         FromMoveTime,
				fromWT:         FromWaitTime,
				fromWWC:        FromWaitWipCount,
				fromYN:         WorkCenterLinkYn,
				fromLine:       FromProductionLine,
				fromColor:      FromColor
			};
			//nodeDataArray.push(nodeData);
			g.setNode(key,{ label : Description, data : nodeData, width : rectWidth, height : rectHeight });
		}

	};  
				
	console.log(nodeDataArray)
	return groupNodeDataArray;
}

// 노드 연결 정보(setEdge 포함)
function builtDagreEdge(g){
	var linkData;
	var linkDataArray = [];
	var tmpFromWorkCenter = "";
	
	if(CON_CONTEXT.inputs.FromWorkCenter.length > 0){
		for(var i = 0; i < CON_CONTEXT.inputs.FromWorkCenter.length; i++){
			// 중복된 라인 생략 및 마지막 노드 라인 생략
			// 2023-04-24 이정원 OEM 마지막 공정 추가
			if(tmpFromWorkCenter != CON_CONTEXT.inputs.FromWorkCenter[i] && !(CON_CONTEXT.inputs.FromWorkCenter[i] == "Z050" || 
			                                                                  CON_CONTEXT.inputs.FromWorkCenter[i] == "S11A60" || 
																			  CON_CONTEXT.inputs.FromWorkCenter[i] == "PHANTM" || 
																			  CON_CONTEXT.inputs.FromWorkCenter[i] == "HZ020" || 
																			  CON_CONTEXT.inputs.FromWorkCenter[i] == "SZ020" || 
																			  CON_CONTEXT.inputs.FromWorkCenter[i] == "KZ020")){
				for(var j = 0; j < CON_CONTEXT.inputs.FromWorkCenter.length; j++){
					if(CON_CONTEXT.inputs.FromWorkCenter[i] == CON_CONTEXT.inputs.FromWorkCenter[j]){
						linkData={
							from: CON_CONTEXT.inputs.FromWorkCenter[j],
							to: CON_CONTEXT.inputs.ToWorkCenter[j],
							type: 1
						};
						
						linkDataArray.push(linkData);
						g.setEdge(CON_CONTEXT.inputs.FromWorkCenter[j], CON_CONTEXT.inputs.ToWorkCenter[j]);					
					}
				}
				
			    tmpFromWorkCenter = CON_CONTEXT.inputs.FromWorkCenter[i];
			}
		}
	}

	// console.log(linkDataArray);
	return linkDataArray;
}

// 노드 그리기
function drawNode(centerX, centerY, rectWidth, rectHeight, data){
	var x = centerX - (rectWidth / 2);
	var y = centerY - (rectHeight / 2);
	var node = data;
			
	var nodegroup = d3.select('svg g.nodes')
				      .append('g')
			  	      .classed('node', true)
				      .attr('id', 'node_group_'+ node.key);

	var titFillColor  = node.fromColor;
	var conFillColor  = "#FFFFFF";
	
    if(node.fromYN == "N"){
		titFillColor = "#7F7F7F";
		conFillColor = "#7F7F7F";
		node.fromST  = "";
		node.fromET  = "";
		node.fromTT  = "";
		node.fromMT  = "";
		node.fromWT  = "";
	}

	// 워크센터 전체 박스
	var operation = nodegroup.append('rect')
			  .attr('x', x)
			  .attr('y', y)
			  .attr('width', rectWidth)
			  .attr('height', rectHeight)
			  .attr('stroke','rgb(125,142,204)')
			  .attr('stroke-width','1')
			  .attr('oprid', data.key)
			  .attr('fill', function(d) {return titFillColor;})
			  .attr('id', function(d){return 'node_group_rect_'+node.key;})
			  .on("mouseover", function(){
					$(this).attr("stroke", "red")
						   .attr('stroke-width','3');
				})		
			  .on("mouseout", function(){
						$(this).attr('stroke','rgb(125,142,204)')
						.attr('stroke-width','1')						
				});
	// 워크센터/명 박스	
	var opFromWCNm = nodegroup.append("rect")
							.attr("x",x)
							.attr("y",y)
							.attr("width", rectWidth)
							.attr("height",30)
							.attr('stroke','rgb(125,142,204)')
							.attr('stroke-width','1')				
							.attr('fill', titFillColor);
	// 시작시간 박스			
	var opFromST = nodegroup.append("rect")
							.attr("x",function(d){ return x+40; })
							.attr("y",function(d){ return y+30; })
							.attr("width", rectWidth - 80)
							.attr("height",30)
							.attr('stroke','rgb(125,142,204)')
							.attr('stroke-width','1')				
							.attr('fill', conFillColor);
	// TaktTime 박스			
	var opFromTT = nodegroup.append("rect")
							.attr("x",function(d){ return x+40; })
							.attr("y",function(d){ return y+60; })
							.attr("width", rectWidth - 80)
							.attr("height",30)
							.attr('stroke','rgb(125,142,204)')
							.attr('stroke-width','1')				
							.attr('fill', conFillColor);
	// 종료시간 박스			
	var opFromET = nodegroup.append("rect")
							.attr("x",function(d){ return x+40; })
							.attr("y",function(d){ return y+90; })
							.attr("width", rectWidth - 80)
							.attr("height",30)
							.attr('stroke','rgb(125,142,204)')
							.attr('stroke-width','1')				
							.attr('fill', conFillColor);
							
	// 대기시간 박스			
	var opFromWT = nodegroup.append("rect")
							.attr("x",function(d){ return x; })
							.attr("y",function(d){ return y+30; })
							.attr("width", 40)
							.attr("height",90)
							.attr('stroke','rgb(125,142,204)')
							.attr('stroke-width','1')				
							.attr('fill', conFillColor);
							
	// 이동시간 박스			
	var opFromMT = nodegroup.append("rect")
							.attr("x",function(d){ return x+210; })
							.attr("y",function(d){ return y+30; })
							.attr("width", 40)
							.attr("height",90)
							.attr('stroke','rgb(125,142,204)')
							.attr('stroke-width','1')				
							.attr('fill', conFillColor);
						
	// 워크센터/명 텍스트
	var opLabelFromWCNm = nodegroup.append("text")
								   .attr("x", function(d){return x + 5;})
								   .attr("y", function(d){return y + 20;})
								   .attr("font-size", function(d){ return 14; })
								   .attr("font-weight", function(d){ return "bold"; })
								   .text(function(d){ return node.fromWCNm; });
	// 시작시간 텍스트	 
	var opLabelFromST = nodegroup.append("text")
								   .attr("x", function(d){return x + 40 + 5;})
								   .attr("y", function(d){return y + 50;})
								   .attr("font-size", function(d){ return 14; })
								   .attr("font-weight", function(d){ return "bold"; })
								   .text(function(d){ return node.fromST; });		
	// TaktTime 텍스트	 
	var opLabelFromTT   = nodegroup.append("text")
								   .attr("x", function(d){return x + 40 + 5;})
								   .attr("y", function(d){return y + 80;})
								   .attr("font-size", function(d){ return 14; })
								   .attr("font-weight", function(d){ return "bold"; })
								   .text(function(d){ return node.fromTT; });		
	// 종료시간 텍스트	 
	var opLabelFromET   = nodegroup.append("text")
								   .attr("x", function(d){return x + 40 + 5;})
								   .attr("y", function(d){return y + 110;})
								   .attr("font-size", function(d){ return 14; })
								   .attr("font-weight", function(d){ return "bold"; })
								   .text(function(d){ return node.fromET; });		

	// 대기시간 텍스트	 
	var opLabelFromWT   = nodegroup.append("text")
								   .attr("x", function(d){return x + 5;})
								   .attr("y", function(d){return y + 80;})
								   .attr("font-size", function(d){ return 14; })
								   .attr("font-weight", function(d){ return "bold"; })
								   .text(function(d){ return node.fromWT; });		

	// 이동시간 텍스트	 
	var opLabelFromMT   = nodegroup.append("text")
								   .attr("x", function(d){return x + 210 + 5;})
								   .attr("y", function(d){return y + 80;})
								   .attr("font-size", function(d){ return 14; })
								   .attr("font-weight", function(d){ return "bold"; })
								   .text(function(d){  
								   		if(node.fromWWC == 0){
											return node.fromMT;
										}else{
											return node.fromMT + "(" + node.fromWWC + ")";
										} 
								   });
}


// 연결선 그리기
function drawNodeEdge(edgeNode, fromNode,toNode, links){
	var triangle = d3.symbol()
	                 .type(d3.symbolTriangle)
	                 .size(50);
	var link = returnLink(fromNode, toNode, links);
	var linkColor = "#0288D1";
	
	if(link == null ){
		linkColor = "#0288D1";
	}else if(link.type == 1){
		linkColor = "#A59400";
	}else if(link.type == 2){
		linkColor = "#B71C1C";		
	}
	
	d3.select('svg g.links')
	  .append("rect")
	  .attr("x",function(d){ return edgeNode.points[0].x-4; })
	  .attr("y",function(d){ return edgeNode.points[0].y-4; })
	  .attr("width", 8)
	  .attr("height",8)
	  .attr('stroke','green')
	  .attr('stroke-width','1');
					 
	d3.select('svg g.links')
	  .append("circle")
	  .attr("cx",function(d){ return edgeNode.points[edgeNode.points.length-1].x; })
	  .attr("cy",function(d){ return edgeNode.points[edgeNode.points.length-1].y; })
	  .attr("r", 3)
      .attr('stroke-width','1')
	  .attr('fill','green');
	
					  
	for(var i = 0; i < edgeNode.points.length-1; i++){
		d3.select('svg g.links')
		  .append('line')
		  .classed('link', true)
		  .attr("x1", edgeNode.points[i].x)
		  .attr("y1", edgeNode.points[i].y)
		  .attr("x2", edgeNode.points[i+1].x)
		  .attr("y2", edgeNode.points[i+1].y)
		  .attr('stroke',linkColor)
		  .attr('stroke-width','2');
		//.attr('id', 'link'+'_'+ links[i].source.data.name+'_'+links[i].target.data.name);
	}
	
	d3.select('svg g.links')
	  .append("path")
	  .attr("d", triangle)
	  .attr("transform", function(d) { return "translate(" + edgeNode.points[edgeNode.points.length-1].x + "," + edgeNode.points[edgeNode.points.length-1].y + ") rotate(90)"; })
	  .attr("fill", 'green');
}

// 그룹 그리기(사용안함)
function drawGroups(group, dagreg){
	var rectWidth  = 250;
	var rectHeight = 120;
	var groupnodes = [];
	var minx = -1, miny = -1, maxx = -1, maxy = -1;
	
	dagreg.nodes().forEach(function(v) {
	    // console.log("Node " + v + ": " + JSON.stringify(dagreg.node(v)));
		var node = dagreg.node(v)
		minx = minx == -1 ? node.x : Math.min(minx, node.x);
		miny = miny == -1 ? node.y : Math.min(miny, node.y);
		maxx = maxx == -1 ? node.x : Math.max(maxx, node.x);
		maxy = maxy == -1 ? node.y : Math.max(maxy, node.y);	
	});

	//console.log('1 :::::: '+minx+'/'+miny+'/'+maxx+'/'+maxy);
	
	if(minx > 0 && miny > 0 && maxx > 0 && maxy > 0){
		var nodegroup = d3.select('svg g.nodegroups')
			  .append("rect")
			  .attr('x', minx - rectWidth  / 2 - 15)
			  .attr('y', miny - rectHeight / 2 - 20 )
			  .attr('width', maxx == minx ? rectWidth  + 280 : maxx - minx + 280)
			  .attr('height',maxy == miny ? rectHeight + 155 : maxy - miny + 155 )
			  .attr('stroke',"#FFFFFF")
			  .attr('stroke-width', '3')
			  .attr("fill", 'none');
	}
	//console.log('2 :::::: '+minx+'/'+miny+'/'+maxx+'/'+maxy);
}

// 연결 정보 리턴
function returnLink(fromNode, toNode, links){
	for(var i = 0; i < links.length; i++){
		if(links[i].from == fromNode && links[i].to == toNode){
			return links[i];
		}
	}
	
	return null;
}
