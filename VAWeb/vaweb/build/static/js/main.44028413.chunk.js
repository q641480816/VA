(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{5409:function(e,t,a){e.exports=a(5728)},5414:function(e,t,a){},5416:function(e,t,a){},5669:function(e,t,a){},5725:function(e,t,a){},5728:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),o=a(30),i=a.n(o),l=(a(5414),a(23)),s=a(24),c=a(26),d=a(25),p=a(27),u=a(5730),h=(a(5416),a(4)),m=a(5729),b=a(5731),y=a(18),g=a(129),f=a(81),O=a.n(f),v=a(111),S=a.n(v);var j=Object(g.withStyles)(function(e){var t;return{root:{display:"block",minWidth:"160px;",width:"90%",height:"8.5vh",minHeight:"60px",margin:"auto",padding:"auto"},image:(t={position:"relative",height:200},Object(y.a)(t,e.breakpoints.down("xs"),{width:"50% !important",height:100}),Object(y.a)(t,"&:hover, &$focusVisible",{zIndex:1,"& $imageBackdrop":{opacity:.15},"& $imageMarked":{opacity:0},"& $imageTitle":{border:"4px solid currentColor"}}),t),focusVisible:{},imageButton:{position:"absolute",left:0,right:0,top:0,bottom:0,display:"flex",alignItems:"center",justifyContent:"center",color:e.palette.common.white},imageSrc:{position:"absolute",left:0,right:0,top:0,bottom:0,backgroundSize:"cover",backgroundPosition:"center 40%"},imageBackdrop:{position:"absolute",left:0,right:0,top:0,bottom:0,backgroundColor:e.palette.common.black,opacity:.4,transition:e.transitions.create("opacity")},imageTitle:{position:"relative",padding:"".concat(.75*e.spacing.unit,"px ").concat(6*e.spacing.unit,"px ").concat(e.spacing.unit+.75,"px")},imageMarked:{height:3,width:18,backgroundColor:e.palette.common.white,position:"absolute",bottom:-2,left:"calc(50% - 9px)",transition:e.transitions.create("opacity")}}})(function(e){var t=e.classes,a=e.images;return r.a.createElement("div",{className:t.root},a.map(function(e){return r.a.createElement(O.a,{focusRipple:!0,key:e.title,className:t.image,focusVisibleClassName:t.focusVisible,style:{width:e.width,height:"8.5vh",minHeight:"40px"},onClick:e.func},r.a.createElement("span",{className:t.imageSrc,style:{backgroundImage:"url(".concat(e.url,")")}}),r.a.createElement("span",{className:t.imageBackdrop}),r.a.createElement("span",{className:t.imageButton},r.a.createElement(S.a,{component:"span",color:"inherit",className:t.imageTitle},e.title,r.a.createElement("span",{className:t.imageMarked}))))}))}),k=a(59),C=a(189),E=a.n(C),A=a(190),M=a.n(A),D=a(191),w=a.n(D),T=a(187),N=a.n(T),R=a(186),B=a.n(R),L=a(112),P=a.n(L),x=a(188),W=a.n(x),I=a(85),F=a(83),U=a.n(F),G=a(179),H=a.n(G),K={fetchUrl:"http://www.callmedady.com:8080/vab/bootstrap/getAll",allData:null,typePair:{prevalenceInPercent:{display:"Prevalence",key:"prevalenceInPercent",description:"Prevalence Rate "},maleInPercent:{display:"Male Smoker",key:"maleInPercent",description:"Male adult smoking percent "},femaleInPercent:{display:"Female Smoker",key:"femaleInPercent",description:"Female adult smoking percent "},dailyConsumption:{display:"Daily Tobacco Consumption",key:"dailyConsumption",description:"Average daily consumption "},death:{display:"Death due to smoke",key:"death",description:"Death due to smoking "},cancerDeathInPercent:{display:"Cancer contribution",key:"cancerDeathInPercent",description:"Cancer contribution to smoking Death "}},mapProjection:{world:{key:"world",display:"World",projection:"translate(0,0)scale(1)"},asia:{key:"asia",display:"Asia",projection:"translate(-700,-70)scale(1.85)",countries:["AFG","AZE","BHR","BGD","ARM","BTN","IOT","LKA","CHN","TWN","CXR","CCK","CYP","GEO","PSE","HKG","IND","IRN","IRQ","ISR","JPN","KAZ","JOR","PRK","KOR","KWT","KGZ","LBN","MAC","MDV","MNG","OMN","NPL","PAK","TLS","QAT","RUS","SAU","SYR","TJK","ARE","TUR","TKM","UZB","YEM"]},OceaniaASEAN:{key:"OceaniaASEAN",display:"Oceania & ASEAN",projection:"translate(-1250,-350)scale(1.95)",countries:["THA","VNM","LAO","SGP","PHL","MMR","KHM","MYS","IDN","BRN","ASM","AUS","SLB","COK","FJI","PYF","KIR","GUM","NRU","NCL","VUT","NZL","NIU","NFK","MNP","UMI","FSM","MHL","PLW","PNG","PCN","TKL","TON","TUV","WLF","WSM"]},europe:{key:"europe",display:"Europe",projection:"translate(-850,0)scale(2.4)",countries:["ALB","AND","AZE","AUT","ARM","BEL","BIH","BGR","BLR","HRV","CYP","CZE","DNK","EST","FRO","FIN","ALA","FRA","GEO","DEU","GIB","GRC","VAT","HUN","ISL","IRL","ITA","KAZ","LVA","LIE","LTU","LUX","MLT","MCO","MDA","MNE","NLD","NOR","POL","PRT","ROU","RUS","SMR","SRB","SVK","SVN","ESP","SJM","SWE","CHE","TUR","UKR","MKD","GBR","GGY","JEY","IMN"]},africa:{key:"africa",display:"Africa",projection:"translate(-650,-280)scale(2)",countries:["DZA","AGO","BWA","BDI","CMR","CPV","CAF","TCD","COM","MYT","COG","COD","BEN","GNQ","ETH","ERI","DJI","GAB","GMB","GHA","GIN","CIV","KEN","LSO","LBR","LBY","MDG","MWI","MLI","MRT","MUS","MAR","MOZ","NAM","NER","NGA","GNB","REU","RWA","SHN","STP","SEN","SYC","SLE","SOM","ZAF","ZWE","SSD","SDN","ESH","SWZ","TGO","TUN","UGA","EGY","TZA","BFA","ZMB"]},northAmerica:{key:"northAmerica",display:"North America",projection:"translate(150,-60)scale(1.85)",countries:["ATG","BHS","BRB","BMU","BLZ","VGB","CAN","CYM","CRI","CUB","DMA","DOM","SLV","GRL","GRD","GLP","GTM","HTI","HND","JAM","MTQ","MEX","MSR","ANT","CUW","ABW","SXM","BES","NIC","UMI","PAN","PRI","BLM","KNA","AIA","LCA","MAF","SPM","VCT","TTO","TCA","USA","VIR"]},southAmerica:{key:"southAmerica",display:"South America",projection:"translate(-100,-420)scale(1.98)",countries:["ARG","BOL","BRA","CHL","COL","ECU","FLK","GUF","GUY","PRY","PER","SUR","URY","VEN"]}},colors:{world:{dark:"#072F66",main:"#0B3D82",medium:"#3266AD",light:"#5481BE"},country:{dark:"#8F480D",main:"#B56726",medium:"#F5AE73",light:"#FFCDA3"},highlight:{dark:"#FCE20A",main:"#FFEA39",medium:"#FFF181",light:"#FFF6AF"}}},z=a(180),Y=a.n(z),V=a(182),Z=a.n(V),J=a(181),X=a.n(J),$=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).handleClickOpen=function(e){a.setState({title:e,isOpen:!0})},a.handleClose=function(){a.setState({isOpen:!1})},a.state={title:"",isOpen:!1,clicked:!1},a.styles=a.props.classes,a.handleClickOpen=a.handleClickOpen.bind(Object(h.a)(Object(h.a)(a))),a.handleClose=a.handleClose.bind(Object(h.a)(Object(h.a)(a))),a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentWillMount",value:function(){}},{key:"componentDidMount",value:function(){this.props.onRef(this)}},{key:"componentWillReceiveProps",value:function(e){}},{key:"componentWillUnmount",value:function(){this.props.onRef(null)}},{key:"render",value:function(){return r.a.createElement(Y.a,{open:this.state.isOpen,maxWidth:"lg",onClose:this.handleClose},r.a.createElement(X.a,{id:"alert-dialog-title"},this.state.title),r.a.createElement(Z.a,null,this.props.children))}}]),t}(n.Component),Q=Object(g.withStyles)(function(e){return{dialog:{maxHeight:1e3,maxWidth:1e3},container:{}}})($),_=a(183),q=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).openDialog=function(e,t){var n={};Object.keys(e.source.data).forEach(function(a){n[a]=e.source.data[a].map(function(e){return e[t]}).sort(function(e,t){return t-e})}),a.setState({data:0!==Object.values(e.selectedCountry).length?e:null,selectedType:t,worldDataSet:n}),0!==Object.values(e.selectedCountry).length?a.dialog.handleClickOpen(K.typePair[a.state.selectedType].display+" in "+Object.values(e.selectedCountry)[0].countryName):alert("N/A")},a.drawChart=function(){},a.prepareLineChart=function(){var e={};e.labels=Object.keys(a.state.data.selectedCountry).sort(),e.datasets=[];var t={label:a.state.data.selectedCountry[e.labels[0]].countryName,fill:!1,lineTension:.1,backgroundColor:K.colors.country.main,borderColor:K.colors.country.medium,borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:K.colors.country.light,pointBackgroundColor:"#fff",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:K.colors.country.main,pointHoverBorderColor:K.colors.country.medium,pointHoverBorderWidth:2,pointRadius:1,pointHitRadius:10,data:function(){var t=[];return e.labels.forEach(function(e){return t.push(a.state.data.selectedCountry[e][a.state.selectedType])}),t}()},n={label:"World",fill:!1,lineTension:.1,backgroundColor:K.colors.world.main,borderColor:K.colors.world.medium,borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:K.colors.world.light,pointBackgroundColor:"#fff",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:K.colors.world.main,pointHoverBorderColor:K.colors.world.medium,pointHoverBorderWidth:2,pointRadius:1,pointHitRadius:10,data:function(){var t=[];return e.labels.forEach(function(e){return t.push(a.state.data.world[e])}),t}()};return e.datasets.push(t,n),e},a.prepareOption=function(){return{maintainAspectRatio:!1,tooltips:{mode:"label",position:"nearest",callbacks:{label:function(e,t){var n=t.datasets[e.datasetIndex].label||"";return" "+n+":  "+(e.yLabel+"").substring(0,5)+a.state.data.separator},afterBody:function(e,t){return"\n"+t.datasets[0].label+"is ranked NO."+(a.state.worldDataSet[e[0].xLabel].indexOf(e[0].yLabel)+1)+" in the World"}}},scales:{yAxes:[{ticks:{padding:10,callback:function(e,t){return e+a.state.data.separator}},scaleLabel:{display:!0,labelString:a.state.data.yLabel}}],xAxes:[{ticks:{padding:10},scaleLabel:{display:!0,labelString:"Year"}}]}}},a.state={data:null,chart:null,selectedType:null,worldDataSet:{}},a.styles=a.props.classes,a.openDialog=a.openDialog.bind(Object(h.a)(Object(h.a)(a))),a.drawChart=a.drawChart.bind(Object(h.a)(Object(h.a)(a))),a.prepareLineChart=a.prepareLineChart.bind(Object(h.a)(Object(h.a)(a))),a.prepareOption=a.prepareOption.bind(Object(h.a)(Object(h.a)(a))),a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentWillMount",value:function(){}},{key:"componentDidMount",value:function(){this.props.onRef(this)}},{key:"componentWillReceiveProps",value:function(e){}},{key:"componentWillUnmount",value:function(){this.props.onRef(null)}},{key:"render",value:function(){var e=this;return null!=this.state.data?r.a.createElement(Q,{onRef:function(t){e.dialog=t}},r.a.createElement("div",{className:this.styles.container},r.a.createElement(_.a,{width:600,height:350,options:this.prepareOption(),data:this.prepareLineChart()}))):r.a.createElement("div",null)}}]),t}(n.Component),ee=Object(g.withStyles)(function(e){return{container:{display:"flex",flexDirection:"column"}}})(q),te=a(113),ae=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).openDialog=function(e){a.setState({selectedType:K.typePair[e.name],data:e,chart:e.chart}),a.dialog.handleClickOpen(K.typePair[e.name].display+" for countries within the range of "+e.legend.display)},a.renderChart=function(){return null!==a.state.data?r.a.createElement(te.b,{data:a.state.chart,animation:!0,height:400,width:600,style:{stroke:"#ddd",strokeOpacity:.3,strokeWidth:"0.5"},hideRootNode:!0,colorType:"literal",onValueMouseOver:function(e){return a.handleMouseOver(e)},onValueMouseOut:function(e){return a.handleMouseOut(e)}},a.state.label&&r.a.createElement(te.a,{data:[{x:0,y:0,label:a.state.label}]})):r.a.createElement("div",null)},a.updateData=function(e,t){return e.children&&e.children.map(function(e){return a.updateData(e,t)}),e.style={fillOpacity:t&&!t[e.name]?.2:1},e},a.getKeyPath=function(e){return e.parent?[e.data&&e.data.name||e.name].concat(a.getKeyPath(e.parent)):["root"]},a.handleMouseOver=function(e){var t=a.getKeyPath(e).reverse();console.log(t);var n=t.reduce(function(e,t){return e[t]=!0,e},{});a.setState({label:2===t.length?"continent":"country",chart:a.updateData(a.state.chart,n)})},a.handleMouseOut=function(e){a.setState({label:null,chart:a.updateData(a.state.data.chart,!1)})},a.state={selectedType:null,data:null,chart:null,label:null},a.styles=a.props.classes,a.openDialog=a.openDialog.bind(Object(h.a)(Object(h.a)(a))),a.renderChart=a.renderChart.bind(Object(h.a)(Object(h.a)(a))),a.handleMouseOver=a.handleMouseOver.bind(Object(h.a)(Object(h.a)(a))),a.handleMouseOut=a.handleMouseOut.bind(Object(h.a)(Object(h.a)(a))),a.updateData=a.updateData.bind(Object(h.a)(Object(h.a)(a))),a.getKeyPath=a.getKeyPath.bind(Object(h.a)(Object(h.a)(a))),a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentWillMount",value:function(){}},{key:"componentDidMount",value:function(){this.props.onRef(this)}},{key:"componentWillReceiveProps",value:function(e){}},{key:"componentWillUnmount",value:function(){this.props.onRef(null)}},{key:"render",value:function(){var e=this;return r.a.createElement(Q,{onRef:function(t){e.dialog=t}},r.a.createElement("div",{className:this.styles.container},this.renderChart()))}}]),t}(n.Component),ne=Object(g.withStyles)(function(e){return{container:{display:"flex",flexDirection:"column"}}})(ae),re=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).getPupUp=function(e,t){var a=null===t?"No Fate Available":t.numberOfThings;return'<div class="hoverinfo" style="display: flex; flex-direction: column"><span>'+e.properties.name+'</span><span style="margin-top: 5px;">'+a+"</span></div>"},a.openLegendDialog=function(e){a.legendSelectDialog.openDialog(a.prepareLegendSelectData(e))},a.prepareCountrySelectData=function(e){var t=a.state.data.fullData,n={selectedCountry:{},world:t.worldAverage,source:t,separator:a.state.data.separator,selectType:a.state.selectedType},r=K.typePair[a.state.selectedType].description;return n.yLabel=0===a.state.data.separator.length?r:r+" in "+a.state.data.separator,Object.keys(t.data).forEach(function(a){for(var r=0;r<t.data[a].length;r++)if(t.data[a][r].countryCode===e){n.selectedCountry[a]=t.data[a][r];break}}),n},a.prepareLegendSelectData=function(e){var t=Object(k.a)().domain([e.value[0],e.value[1]>100?e.value[0]+20:e.value[1]]).range(["#EFEFFF",K.colors.world.dark]),n={name:a.state.selectedType,rawData:a.state.data,legend:e},r={name:e.display,color:K.colors.world.dark,children:[]};return Object.keys(K.mapProjection).forEach(function(n){var o=K.mapProjection[n];if("world"!==o.key){var i={name:o.display,color:K.colors.world.medium,children:[]};if(e.valueSet.forEach(function(e){var n=a.state.data.rawData[e];o.countries.indexOf(e)>=0&&i.children.push({name:n.countryName,color:t(n[a.state.selectedType]),size:n[a.state.selectedType]})}),i.children.length>0){var l=0;i.children.forEach(function(e){l+=e.size});var s=Object(k.a)().domain([e.value[0],e.value[1]>100?e.value[0]+20:e.value[1]]).range(["#EFEFFF",K.colors.country.dark]);i.color=s(l/i.children.length),r.children.push(i)}}}),r.children.length>0&&(n.chart=r),n},a.drawMap=function(){var e=new H.a({scope:"world",element:document.getElementById("mapContainer"),projection:"equirectangular",responsive:!1,dataType:"json",fills:{defaultFill:"#ddd"},done:function(e){e.svg.selectAll(".datamaps-subunit").on("click",function(e){a.countrySelectDialog.openDialog(a.prepareCountrySelectData(e.properties.iso),a.state.selectedType)})},data:a.state.data.dataset,geographyConfig:{borderColor:a.state.borderDefault,borderWidth:a.state.defaultStrokeWidth,highlightBorderColor:a.state.highlightBorderColor,highlightBorderWidth:a.state.highlightStrokeWidth,highlightFillColor:function(e){return e.fillColor||"#ddd"},highlightOnHover:!0,popupTemplate:function(e,t){return a.getPupUp(e,t)}}});return e.svg.selectAll("g").attr("transform",a.state.selectedArea.projection),e},a.renderLegend=function(){if(a.state.data.legendSet)return r.a.createElement("div",{className:a.styles.legendContainer},r.a.createElement("div",{className:a.styles.legendWrapper,style:{width:a.state.data.legendSet.length*a.state.legendBlockSize+"vw",minWidth:38*a.state.data.legendSet.length+"px"}},a.state.data.legendSet.map(function(e){return r.a.createElement(U.a,{title:e.display,placement:"top",key:e.display},r.a.createElement("div",{className:a.styles.legendBlock,style:{backgroundColor:e.color,width:a.state.legendBlockSize+"vw"},onMouseOver:function(){return a.onLegendBlockMouseOver(e.valueSet)},onMouseOut:function(){return a.onLegendBlockMouseOut()},onClick:function(){return a.openLegendDialog(e)}}))})))},a.clearMap=function(){for(var e=a.mapRef.current,t=Array.from(e.childNodes),n=0;n<t.length;n++){var r=t[n];e.removeChild(r)}},a.onLegendBlockMouseOver=function(e){e.forEach(function(e){a.state.map.svg.selectAll("."+e).transition().style("stroke-width",a.state.highlightStrokeWidth).style("stroke",a.state.highlightBorderColor)})},a.onLegendBlockMouseOut=function(){a.state.map.svg.selectAll(".datamaps-subunit").transition().style("stroke",a.state.borderDefault)},a.state={mapClass:null,map:null,data:null,legendBlockSize:7,borderDefault:"#DEDEDE",highlightBorderColor:K.colors.highlight.dark,highlightStrokeWidth:1,defaultStrokeWidth:.45,selectedArea:K.mapProjection[0],selectedType:"prevalenceInPercent"},a.mapRef=r.a.createRef(),a.styles=a.props.classes,a.drawMap=a.drawMap.bind(Object(h.a)(Object(h.a)(a))),a.clearMap=a.clearMap.bind(Object(h.a)(Object(h.a)(a))),a.getPupUp=a.getPupUp.bind(Object(h.a)(Object(h.a)(a))),a.renderLegend=a.renderLegend.bind(Object(h.a)(Object(h.a)(a))),a.onLegendBlockMouseOver=a.onLegendBlockMouseOver.bind(Object(h.a)(Object(h.a)(a))),a.onLegendBlockMouseOut=a.onLegendBlockMouseOut.bind(Object(h.a)(Object(h.a)(a))),a.prepareCountrySelectData=a.prepareCountrySelectData.bind(Object(h.a)(Object(h.a)(a))),a.prepareLegendSelectData=a.prepareLegendSelectData.bind(Object(h.a)(Object(h.a)(a))),a.openLegendDialog=a.openLegendDialog.bind(Object(h.a)(Object(h.a)(a))),a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentWillMount",value:function(){window.addEventListener("resize",function(){}),this.setState({mapClass:this.props.mapClass,data:this.props.data,selectedArea:this.props.selectedArea,selectedType:this.props.selectedType})}},{key:"componentDidMount",value:function(){this.setState({map:this.drawMap()})}},{key:"componentWillReceiveProps",value:function(e){var t=this.state.map;e.data!==this.state.data&&t.updateChoropleth(e.data.dataset),e.selectedArea!==this.state.selectedArea&&t.svg.selectAll("g").attr("transform",e.selectedArea.projection),this.setState({data:e.data,map:t,mapClass:e.mapClass,selectedArea:e.selectedArea,selectedType:e.selectedType})}},{key:"componentDidUpdate",value:function(e,t,a){this.state.mapClass!==t.mapClass&&(this.clearMap(),this.setState({map:this.drawMap()}))}},{key:"componentWillUnmount",value:function(){this.clearMap()}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("div",{id:"mapContainer",style:this.state.mapClass,ref:this.mapRef}),this.renderLegend(),r.a.createElement(ee,{onRef:function(t){e.countrySelectDialog=t}}),r.a.createElement(ne,{onRef:function(t){e.legendSelectDialog=t}}))}}]),t}(n.Component),oe=Object(g.withStyles)(function(e){var t,a;return{legendContainer:(t={position:"relative",width:"100vw"},Object(y.a)(t,e.breakpoints.down("xs"),{marginTop:"-5px"}),Object(y.a)(t,e.breakpoints.up("sm"),{marginTop:"-10px"}),Object(y.a)(t,e.breakpoints.up("md"),{marginTop:"-17px"}),t),legendWrapper:{position:"relative",margin:"auto",display:"flex",flexDirection:"row"},legendBlock:(a={borderTop:"2px solid #ffffff",borderBottom:"2px solid #ffffff",position:"relative",zIndex:100,minWidth:"38px"},Object(y.a)(a,e.breakpoints.down("xs"),{height:"4px"}),Object(y.a)(a,e.breakpoints.up("sm"),{height:"10px"}),Object(y.a)(a,e.breakpoints.up("md"),{height:"12px"}),Object(y.a)(a,"&:hover",{borderTop:"2px solid "+K.colors.highlight.dark,borderBottom:"2px solid "+K.colors.highlight.dark}),a)}})(re),ie=(a(5669),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).renderSelect=function(e,t,n,o,i){return r.a.createElement(B.a,{disabled:a.state.isAutoPlay,style:{marginRight:"15px"}},r.a.createElement(N.a,{name:e,displayEmpty:!0,value:a.state[t],onChange:function(e){return o(e)},disableUnderline:!0},r.a.createElement(P.a,{value:"",disabled:!0,key:""},i),Object.keys(n).map(function(e){return r.a.createElement(P.a,{value:n[e].key,key:n[e].key,style:{textAlign:"center"}},r.a.createElement("span",{className:a.styles.menuItem},n[e].display))})))},a.renderSlider=function(){return r.a.createElement("div",{className:"timeBar"},r.a.createElement(W.a,{className:"slider",value:a.state.yearSelected,min:0,max:a.state.yearSet.length-1,step:1,onChange:function(e,t){a.setState({yearSelected:t})},thumb:r.a.createElement(U.a,{title:a.state.yearSet[a.state.yearSelected]},r.a.createElement(I.a,{style:{color:K.colors.world.medium}}))}))},a.renderDescription=function(){return r.a.createElement("div",{className:"description"},r.a.createElement("span",{className:a.styles.descriptionContent},K.typePair[a.state.selectedType].description+"in "+a.state.yearSet[a.state.yearSelected]))},a.mapResize=function(){a.setState({mapClass:a.prepareMapClass()})},a.prepareMapClass=function(){var e=.65*document.documentElement.clientHeight,t=11*e/5;return t>=document.documentElement.clientWidth&&(e=(t=document.documentElement.clientWidth-20)/11*5),{position:"relative",marginLeft:"auto",marginRight:"auto",height:e+"px",width:t+"px"}},a.processData=function(){var e={},t=K.typePair[a.state.selectedType].key,n=a.state.data.typeYearDataSet[t].data[a.state.yearSet[a.state.yearSelected]],r=a.state.data.typeYearDataSet[t].legend,o={},i={},l=n.map(function(e){return e[t]}),s=Object(k.a)().domain([0,null!=r?r[r.length-1]:Math.max.apply(null,l)]).range(["#EFEFFF",K.colors.world.dark]),c=a.state.data.typeYearDataSet[t].legendSeparator,d=[];if(r){for(var p=0;p<r.length-1;p++)d.push({display:r[p]+c+" - "+r[p+1]+c,color:s(r[p]),value:[r[p],r[p+1]],valueSet:[]});d.push({display:"> "+r[r.length-1]+c,color:s(r[r.length-1]),value:[r[r.length-1],Number.MAX_SAFE_INTEGER],valueSet:[]})}return n.forEach(function(e){var a=e.countryCode,n=e[t];i[a]={numberOfThings:n,fillColor:s(n)};for(var r=0;r<d.length;r++){var l=d[r];l.value[0]<=n&&l.value[1]>n&&l.valueSet.push(a),d[r]=l}o[a]=e}),e.dataset=i,e.legendSet=d,e.fullData={},e.fullData.data=a.state.data.typeYearDataSet[t].data,e.fullData.worldAverage=a.state.data.typeYearDataSet[t].average,e.separator=c,e.rawData=o,e},a.onSelectTypeChange=function(e){a.setState({selectedType:e.target.value,yearSet:a.state.data.typeYearDataSet[e.target.value].years,yearSelected:0})},a.onSelectedAreaChange=function(e){a.setState({selectedArea:e.target.value})},a.togglePlay=function(e){a.setState({isAutoPlay:e}),e&&a.play(e)},a.play=function(e){if(e||a.state.isAutoPlay){var t=a.state.yearSelected+1;a.setState({yearSelected:t,isAutoPlay:t!==a.state.yearSet.length-1}),setTimeout(function(){a.play()},200)}else a.state.yearSelected===a.state.yearSet.length-1&&a.setState({yearSelected:0})},a.state={mapClass:null,data:null,selectedType:"prevalenceInPercent",yearSet:[],yearSelected:0,isAutoPlay:!1,mapBoxHeight:72,selectedArea:K.mapProjection.world.key},a.styles=a.props.classes,a.prepareMapClass=a.prepareMapClass.bind(Object(h.a)(Object(h.a)(a))),a.processData=a.processData.bind(Object(h.a)(Object(h.a)(a))),a.renderDescription=a.renderDescription.bind(Object(h.a)(Object(h.a)(a))),a.renderSelect=a.renderSelect.bind(Object(h.a)(Object(h.a)(a))),a.renderSlider=a.renderSlider.bind(Object(h.a)(Object(h.a)(a))),a.onSelectTypeChange=a.onSelectTypeChange.bind(Object(h.a)(Object(h.a)(a))),a.onSelectedAreaChange=a.onSelectedAreaChange.bind(Object(h.a)(Object(h.a)(a))),a.play=a.play.bind(Object(h.a)(Object(h.a)(a))),a.togglePlay=a.togglePlay.bind(Object(h.a)(Object(h.a)(a))),a.mapResize=a.mapResize.bind(Object(h.a)(Object(h.a)(a))),a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentWillMount",value:function(){this.setState({mapClass:this.prepareMapClass(),data:this.props.data,yearSet:this.props.data.typeYearDataSet[this.state.selectedType].years})}},{key:"componentDidMount",value:function(){window.addEventListener("resize",this.mapResize)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.mapResize)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"map-base"},r.a.createElement(E.a,null,r.a.createElement(M.a,{position:"static",className:this.styles.configBar},r.a.createElement(w.a,{style:{minHeight:"35px",height:"6vh"}},this.renderSelect("type","selectedType",K.typePair,this.onSelectTypeChange,"Types"),this.renderSelect("area","selectedArea",K.mapProjection,this.onSelectedAreaChange,"Areas"))),this.renderDescription(),r.a.createElement("div",{className:this.styles.mapContainer},r.a.createElement(oe,{mapClass:this.state.mapClass,data:this.processData(),selectedArea:K.mapProjection[this.state.selectedArea],selectedType:this.state.selectedType}))),r.a.createElement("div",{style:{width:"100vw",height:"6vh"}},r.a.createElement("div",{className:"bottom"},r.a.createElement("div",{style:{width:"3vw",minWidth:"25px"}},this.state.isAutoPlay?r.a.createElement(I.b,{onClick:function(){return e.togglePlay(!1)}}):r.a.createElement(I.c,{onClick:function(){return e.togglePlay(!0)}})),this.renderSlider())))}}]),t}(n.Component)),le=Object(g.withStyles)(function(e){var t,a;return{menuItem:(t={},Object(y.a)(t,e.breakpoints.down("sm"),{fontSize:"12px !important"}),Object(y.a)(t,e.breakpoints.up("lg"),{fontSize:"17px !important"}),t),configBar:{borderRadius:0,height:"6vh",minHeight:"35px",backgroundColor:"#ffffff"},descriptionContent:(a={},Object(y.a)(a,e.breakpoints.down("xs"),{fontSize:"17px !important"}),Object(y.a)(a,e.breakpoints.up("sm"),{fontSize:"24px !important",fonWeight:"bold"}),Object(y.a)(a,e.breakpoints.up("md"),{fontSize:"33px !important",fonWeight:"bold"}),a),mapContainer:{width:"100vw",height:"65vh",paddingTop:"4.5vh",paddingBottom:"2.5vh"}}})(ie),se=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).state={},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,"Fate")}}]),t}(n.Component),ce=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).state={},a.styles=a.props.classes,a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:this.styles.container},r.a.createElement("div",{className:this.styles.titleWrapper},r.a.createElement("span",{className:this.styles.mainTitle},"Smoke Till My Last Breath")),r.a.createElement("div",{className:this.styles.titleWrapper,style:{marginTop:"22px"}},r.a.createElement("span",{className:this.styles.subTitle},"Is So Good")))}}]),t}(n.Component),de=Object(g.withStyles)(function(e){var t,a;return{container:{width:"100vw",marginTop:"100px"},titleWrapper:{textAlign:"center",color:"black",fontFamily:"Verdana, Geneva, sans-serif"},mainTitle:(t={},Object(y.a)(t,e.breakpoints.down("xs"),{fontSize:"24px !important"}),Object(y.a)(t,e.breakpoints.up("sm"),{fontSize:"40px !important",fonWeight:"bold"}),Object(y.a)(t,e.breakpoints.up("md"),{fontSize:"55px !important",fonWeight:"bold"}),t),subTitle:(a={},Object(y.a)(a,e.breakpoints.down("xs"),{fontSize:"8px !important"}),Object(y.a)(a,e.breakpoints.up("sm"),{fontSize:"14px !important",fonWeight:"bold"}),Object(y.a)(a,e.breakpoints.up("md"),{fontSize:"20px !important",fonWeight:"bold"}),a)}})(ce),pe=(a(5725),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).getNavigationBar=function(){return[{url:"https://imgcs.artprintimages.com/img/print/print/pela-design-old-world-map_a-l-9730967-0.jpg?w=550&h=550",title:"World",width:"50%",func:a.onMapShow},{url:"https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/3531131/1360/906/m1/fpnw/wm1/wyxjobfaj3tqsfffecuvn3asvh9jutaao5tv8wmi2petimokkb1ksubbpbazinh2-.jpg?1509966990&s=5858246a1eae64c71c048b64d355653b",title:"Fate",width:"50%",func:a.onDataShow}]},a.getCountryYear=function(){fetch(K.fetchUrl,{method:"get",headers:{"Content-Type":"application/json"}}).then(function(e){return e.json()}).then(function(e){K.allData=e,a.setState({data:e})}).catch(function(e){return console.log(e)})},a.onMapShow=function(){a.state.history.push("/map")},a.onDataShow=function(){a.state.history.push("/fate")},a.renderMap=function(){return null!=a.state.data?r.a.createElement(le,{data:a.state.data}):r.a.createElement("div",null)},a.state={data:null,history:null},a.getNavigationBar=a.getNavigationBar.bind(Object(h.a)(Object(h.a)(a))),a.onMapShow=a.onMapShow.bind(Object(h.a)(Object(h.a)(a))),a.onDataShow=a.onDataShow.bind(Object(h.a)(Object(h.a)(a))),a.renderMap=a.renderMap.bind(Object(h.a)(Object(h.a)(a))),a.getCountryYear=a.getCountryYear.bind(Object(h.a)(Object(h.a)(a))),a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentWillMount",value:function(){this.setState({history:this.props.history}),this.getCountryYear()}},{key:"render",value:function(){return r.a.createElement("div",{className:"base"},r.a.createElement("div",{id:"toolbar"},r.a.createElement(j,{images:this.getNavigationBar()})),r.a.createElement("div",{id:"content"},r.a.createElement(m.a,{exact:!0,path:"/",component:de}),r.a.createElement(m.a,{path:"/map",component:this.renderMap}),r.a.createElement(m.a,{path:"/fate",component:se})))}}]),t}(n.Component)),ue=Object(b.a)(pe),he=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){document.title="Chainsmokers"}},{key:"render",value:function(){return r.a.createElement(u.a,null,r.a.createElement(ue,null))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(he,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[5409,2,1]]]);
//# sourceMappingURL=main.44028413.chunk.js.map