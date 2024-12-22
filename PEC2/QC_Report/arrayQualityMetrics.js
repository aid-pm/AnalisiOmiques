// (C) Wolfgang Huber 2010-2011

// Script parameters - these are set up by R in the function 'writeReport' when copying the 
//   template for this script from arrayQualityMetrics/inst/scripts into the report.

var highlightInitial = [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false ];
var arrayMetadata    = [ [ "1", "GSM944843", "GSM944843", "hour 24", "infected", "L", "2010-11-10T16:14:28Z" ], [ "2", "GSM944857", "GSM944857", "hour 24", "infected", "L", "2010-11-10T16:32:50Z" ], [ "3", "GSM944850", "GSM944850", "hour 24", "infected", "L", "2010-11-10T16:42:09Z" ], [ "4", "GSM944836", "GSM944836", "hour 24", "infected", "L", "2010-11-10T17:00:43Z" ], [ "5", "GSM944861", "GSM944861", "hour 0", "uninfected", "L", "2010-11-10T17:10:05Z" ], [ "6", "GSM944840", "GSM944840", "hour 0", "uninfected", "L", "2010-11-10T17:50:17Z" ], [ "7", "GSM944833", "GSM944833", "hour 0", "uninfected", "L", "2010-11-10T17:59:38Z" ], [ "8", "GSM944854", "GSM944854", "hour 0", "uninfected", "L", "2010-11-10T18:08:35Z" ], [ "9", "GSM944856", "GSM944856", "hour 24", "infected", "untreated", "2010-11-10T18:17:56Z" ], [ "10", "GSM944842", "GSM944842", "hour 24", "infected", "untreated", "2010-11-10T18:36:29Z" ], [ "11", "GSM944863", "GSM944863", "hour 24", "infected", "untreated", "2010-11-10T19:04:21Z" ], [ "12", "GSM944849", "GSM944849", "hour 24", "infected", "untreated", "2010-11-10T19:13:34Z" ], [ "13", "GSM944852", "GSM944852", "hour 0", "uninfected", "untreated", "2010-11-10T19:22:48Z" ], [ "14", "GSM944845", "GSM944845", "hour 0", "uninfected", "untreated", "2010-11-10T19:32:16Z" ], [ "15", "GSM944831", "GSM944831", "hour 0", "uninfected", "untreated", "2010-11-10T19:41:23Z" ], [ "16", "GSM944859", "GSM944859", "hour 0", "uninfected", "untreated", "2010-11-10T20:00:00Z" ], [ "17", "GSM944858", "GSM944858", "hour 24", "infected", "V", "2010-11-10T20:15:24Z" ], [ "18", "GSM944865", "GSM944865", "hour 24", "infected", "V", "2010-11-10T20:24:45Z" ], [ "19", "GSM944851", "GSM944851", "hour 24", "infected", "V", "2010-11-10T20:35:13Z" ], [ "20", "GSM944837", "GSM944837", "hour 24", "infected", "V", "2010-11-10T20:44:31Z" ], [ "21", "GSM944855", "GSM944855", "hour 0", "uninfected", "V", "2010-11-10T20:53:55Z" ], [ "22", "GSM944848", "GSM944848", "hour 0", "uninfected", "V", "2010-11-10T21:12:26Z" ], [ "23", "GSM944834", "GSM944834", "hour 0", "uninfected", "V", "2010-11-10T21:30:54Z" ], [ "24", "GSM944841", "GSM944841", "hour 0", "uninfected", "V", "2010-11-10T21:49:42Z" ] ];
var svgObjectNames   = [ "pca", "dens" ];

var cssText = ["stroke-width:1; stroke-opacity:0.4",
               "stroke-width:3; stroke-opacity:1" ];

// Global variables - these are set up below by 'reportinit'
var tables;             // array of all the associated ('tooltips') tables on the page
var checkboxes;         // the checkboxes
var ssrules;


function reportinit() 
{
 
    var a, i, status;

    /*--------find checkboxes and set them to start values------*/
    checkboxes = document.getElementsByName("ReportObjectCheckBoxes");
    if(checkboxes.length != highlightInitial.length)
	throw new Error("checkboxes.length=" + checkboxes.length + "  !=  "
                        + " highlightInitial.length="+ highlightInitial.length);
    
    /*--------find associated tables and cache their locations------*/
    tables = new Array(svgObjectNames.length);
    for(i=0; i<tables.length; i++) 
    {
        tables[i] = safeGetElementById("Tab:"+svgObjectNames[i]);
    }

    /*------- style sheet rules ---------*/
    var ss = document.styleSheets[0];
    ssrules = ss.cssRules ? ss.cssRules : ss.rules; 

    /*------- checkboxes[a] is (expected to be) of class HTMLInputElement ---*/
    for(a=0; a<checkboxes.length; a++)
    {
	checkboxes[a].checked = highlightInitial[a];
        status = checkboxes[a].checked; 
        setReportObj(a+1, status, false);
    }

}


function safeGetElementById(id)
{
    res = document.getElementById(id);
    if(res == null)
        throw new Error("Id '"+ id + "' not found.");
    return(res)
}

/*------------------------------------------------------------
   Highlighting of Report Objects 
 ---------------------------------------------------------------*/
function setReportObj(reportObjId, status, doTable)
{
    var i, j, plotObjIds, selector;

    if(doTable) {
	for(i=0; i<svgObjectNames.length; i++) {
	    showTipTable(i, reportObjId);
	} 
    }

    /* This works in Chrome 10, ssrules will be null; we use getElementsByClassName and loop over them */
    if(ssrules == null) {
	elements = document.getElementsByClassName("aqm" + reportObjId); 
	for(i=0; i<elements.length; i++) {
	    elements[i].style.cssText = cssText[0+status];
	}
    } else {
    /* This works in Firefox 4 */
    for(i=0; i<ssrules.length; i++) {
        if (ssrules[i].selectorText == (".aqm" + reportObjId)) {
		ssrules[i].style.cssText = cssText[0+status];
		break;
	    }
	}
    }

}

/*------------------------------------------------------------
   Display of the Metadata Table
  ------------------------------------------------------------*/
function showTipTable(tableIndex, reportObjId)
{
    var rows = tables[tableIndex].rows;
    var a = reportObjId - 1;

    if(rows.length != arrayMetadata[a].length)
	throw new Error("rows.length=" + rows.length+"  !=  arrayMetadata[array].length=" + arrayMetadata[a].length);

    for(i=0; i<rows.length; i++) 
 	rows[i].cells[1].innerHTML = arrayMetadata[a][i];
}

function hideTipTable(tableIndex)
{
    var rows = tables[tableIndex].rows;

    for(i=0; i<rows.length; i++) 
 	rows[i].cells[1].innerHTML = "";
}


/*------------------------------------------------------------
  From module 'name' (e.g. 'density'), find numeric index in the 
  'svgObjectNames' array.
  ------------------------------------------------------------*/
function getIndexFromName(name) 
{
    var i;
    for(i=0; i<svgObjectNames.length; i++)
        if(svgObjectNames[i] == name)
	    return i;

    throw new Error("Did not find '" + name + "'.");
}


/*------------------------------------------------------------
  SVG plot object callbacks
  ------------------------------------------------------------*/
function plotObjRespond(what, reportObjId, name)
{

    var a, i, status;

    switch(what) {
    case "show":
	i = getIndexFromName(name);
	showTipTable(i, reportObjId);
	break;
    case "hide":
	i = getIndexFromName(name);
	hideTipTable(i);
	break;
    case "click":
        a = reportObjId - 1;
	status = !checkboxes[a].checked;
	checkboxes[a].checked = status;
	setReportObj(reportObjId, status, true);
	break;
    default:
	throw new Error("Invalid 'what': "+what)
    }
}

/*------------------------------------------------------------
  checkboxes 'onchange' event
------------------------------------------------------------*/
function checkboxEvent(reportObjId)
{
    var a = reportObjId - 1;
    var status = checkboxes[a].checked;
    setReportObj(reportObjId, status, true);
}


/*------------------------------------------------------------
  toggle visibility
------------------------------------------------------------*/
function toggle(id){
  var head = safeGetElementById(id + "-h");
  var body = safeGetElementById(id + "-b");
  var hdtxt = head.innerHTML;
  var dsp;
  switch(body.style.display){
    case 'none':
      dsp = 'block';
      hdtxt = '-' + hdtxt.substr(1);
      break;
    case 'block':
      dsp = 'none';
      hdtxt = '+' + hdtxt.substr(1);
      break;
  }  
  body.style.display = dsp;
  head.innerHTML = hdtxt;
}
