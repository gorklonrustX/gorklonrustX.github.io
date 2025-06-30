// Copyright (c) 2002-2013 Quadralay Corporation.  All rights reserved.
//
/*jslint maxerr: 50, indent: 2, white: true */
/*global window */
/*global WebWorksHTMLHelp */
/*global HTMLHelpPopup_Object */

function  HTMLHelpUtility_NotifyClickedPopup()
{
  'use strict';

  // Not a member function, need to access via variable
  //
  WebWorksHTMLHelp.mbPopupClicked = true;
}

function  HTMLHelp_Object()
{
  'use strict';

  this.mbPopupClicked  = false;
  this.mbOverPopupLink = false;
  this.mEvent          = null;
  this.mPopup          = new HTMLHelpPopup_Object("WebWorksHTMLHelp.mPopup",
                                                  "window",
                                                  HTMLHelpUtility_NotifyClickedPopup,
                                                  "HTMLHelpPopupDIV", "HTMLHelpPopupText",
                                                  10, 12, 20, 200);
  this.mPopupLoaded    = false;

  this.fNotifyClicked          = HTMLHelp_NotifyClicked;
  this.fMouseOverPopup         = HTMLHelp_MouseOverPopup;
  this.fMouseOutPopup          = HTMLHelp_MouseOutPopup;
  this.fShowPopup              = HTMLHelp_ShowPopup;
  this.fPopupAdjustSize        = HTMLHelp_PopupAdjustSize;
  this.fPopupAdjustSize_Height = HTMLHelp_PopupAdjustSize_Height;
  this.fPopupLoaded            = HTMLHelp_PopupLoaded;
  this.fRevealPopup            = HTMLHelp_RevealPopup;
  this.fHidePopup              = HTMLHelp_HidePopup;
  this.fPopupDivTag            = HTMLHelp_PopupDivTag;
}

function  HTMLHelp_NotifyClicked()
{
  'use strict';

  if (this.mbPopupClicked)
  {
    this.mbPopupClicked = false;
  }
  else if ( ! this.mbOverPopupLink)
  {
    this.fHidePopup();
  }
}

function  HTMLHelp_MouseOverPopup(ParamEvent)
{
  'use strict';

  this.mbOverPopupLink = true;

  this.mEvent = {};
  this.mEvent.x = ParamEvent.x;
  this.mEvent.y = ParamEvent.y;
}

function  HTMLHelp_MouseOutPopup()
{
  'use strict';

  this.mbOverPopupLink = false;
}

function  HTMLHelp_ShowPopup(ParamLink)
{
  'use strict';

  var VarHTML;

  this.mPopupLoaded = false;

  if (this.mEvent !== null)
  {
    VarHTML = "<iframe id=\"WWHPopupIFrame\" frameborder=\"0\" scrolling=\"no\" width=\"" + this.mPopup.mWidth + "px\" height=\"50px\" src=\"" + ParamLink + "\" onload=\"javascript:WebWorksHTMLHelp.fPopupLoaded()\"></iframe>";
    this.mbPopupClicked = false;
    this.mPopup.fShow(VarHTML, this.mEvent);

    // WORKAROUND: Need to size popup after IFrame has loaded
    //
    if (this.mPopup.mSetTimeoutID !== null)
    {
      window.clearTimeout(this.mPopup.mSetTimeoutID);
      this.mPopup.mSetTimeoutID = null;

      this.mPopup.mSetTimeoutID = window.setTimeout("WebWorksHTMLHelp.fRevealPopup()", this.mPopup.mTimeout);
    }
  }

  this.mEvent = null;
}

function  HTMLHelp_PopupAdjustSize()
{
  'use strict';

  var VarPopupWindow, VarPopupDocument, VarDocumentElement, VarIFrame, VarElement, VarMaxWidth, VarWidth, VarHeight, VarArea, VarFourByThreeScale, VarTargetWidth;
  
  // Access popup iframe
  //
  VarPopupWindow = eval(this.mPopup.mWindowRef);
  VarPopupDocument = VarPopupWindow.document;
  VarIFrame = VarPopupDocument.all['WWHPopupIFrame'];

  // Access document elements
  //
  if ((VarPopupDocument.documentElement !== undefined) &&
      (VarPopupDocument.documentElement.clientWidth !== undefined) &&
      (VarPopupDocument.documentElement.clientHeight !== undefined) &&
      ((VarPopupDocument.documentElement.clientWidth !== 0) ||
       (VarPopupDocument.documentElement.clientHeight !== 0)))
  {
    VarDocumentElement = VarPopupDocument.documentElement;
    VarElement = VarIFrame.contentWindow.document.documentElement;
  }
  else
  {
    VarDocumentElement = VarPopupDocument.body;
    VarElement = VarIFrame.contentWindow.document.body;
  }

  // Determine maximum width
  //
  VarMaxWidth = VarDocumentElement.clientWidth - 16;

  // Calculate target dimensions
  //
  VarWidth = (VarElement.scrollWidth > VarElement.offsetWidth) ? VarElement.scrollWidth : VarElement.offsetWidth;
  VarHeight = (VarElement.scrollHeight > VarElement.offsetHeight) ? VarElement.scrollHeight : VarElement.offsetHeight;
  VarArea = VarWidth * VarHeight;
  VarFourByThreeScale = Math.sqrt(VarArea / 12);
  VarTargetWidth = VarFourByThreeScale * 4;
  if (VarTargetWidth > VarWidth)
  {
    if (VarTargetWidth < VarMaxWidth)
    {
      VarWidth = VarTargetWidth;
    }
    else
    {
      VarWidth = VarMaxWidth;
    }
  }

  // Update IFrame width
  //
  if (VarWidth > parseInt(VarIFrame.width, 10))
  {
    VarIFrame.width = String(VarWidth) + "px";
  }

  // Update height after delay
  //
  window.setTimeout(function () {
      WebWorksHTMLHelp.fPopupAdjustSize_Height();
  }, 1);
}

function  HTMLHelp_PopupAdjustSize_Height()
{
  'use strict';

  var VarPopupWindow, VarPopupDocument, VarDocumentElement, VarIFrame, VarElement, VarMaxHeight, VarHeight;

  // Access popup iframe
  //
  VarPopupWindow = eval(this.mPopup.mWindowRef);
  VarPopupDocument = VarPopupWindow.document;
  VarIFrame = VarPopupDocument.all['WWHPopupIFrame'];

  // Access document elements
  //
  if ((VarPopupDocument.documentElement !== undefined) &&
      (VarPopupDocument.documentElement.clientWidth !== undefined) &&
      (VarPopupDocument.documentElement.clientHeight !== undefined) &&
      ((VarPopupDocument.documentElement.clientWidth !== 0) ||
       (VarPopupDocument.documentElement.clientHeight !== 0)))
  {
    VarDocumentElement = VarPopupDocument.documentElement;
    VarElement = VarIFrame.contentWindow.document.documentElement;
  }
  else
  {
    VarDocumentElement = VarPopupDocument.body;
    VarElement = VarIFrame.contentWindow.document.body;
  }

  // Determine maximum height
  //
  VarMaxHeight = VarDocumentElement.clientHeight - 16;

  // Determine height
  //
  VarHeight = (VarElement.scrollHeight > VarElement.offsetHeight) ? VarElement.scrollHeight : VarElement.offsetHeight;
  VarHeight += 4;
  if (VarHeight > VarMaxHeight)
  {
    VarHeight = VarMaxHeight;
  }

  // Update IFrame width/height
  //
  if (VarHeight > parseInt(VarIFrame.height, 10))
  {
    VarIFrame.height = String(VarHeight) + "px";
  }

  this.mPopupLoaded = true;
}

function  HTMLHelp_PopupLoaded()
{
  'use strict';

  this.fPopupAdjustSize();
}

function  HTMLHelp_RevealPopup()
{
  'use strict';

  var VarPopupDocument, VarIFrame, VarElement;
  
  if (this.mPopupLoaded)
  {
    // Reveal
    //
    this.mPopup.fReveal();

    // Access popup IFrame
    //
    VarPopupDocument = eval(this.mPopup.mWindowRef + ".document");
    VarIFrame = VarPopupDocument.all['WWHPopupIFrame'];
    VarElement = VarIFrame.contentWindow.document.body;

    // "Toggle" IFrame content
    //
    VarElement.innerHTML = VarElement.innerHTML + " ";
  }
  else
  {
    this.mPopup.mSetTimeoutID = window.setTimeout("WebWorksHTMLHelp.fRevealPopup()", 10);
  }
}

function  HTMLHelp_HidePopup()
{
  'use strict';

  this.mPopup.fHide();

  this.mPopupLoaded = false;
}

function  HTMLHelp_PopupDivTag()
{
  'use strict';

  return this.mPopup.fDivTagText();
}
