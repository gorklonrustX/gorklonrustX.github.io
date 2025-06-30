// Copyright (c) 2002-2013 Quadralay Corporation.  All rights reserved.
//
/*jslint maxerr: 50, indent: 2, white: true */
/*global window */
/*global Image */

function  HTMLHelpPopup_Object(ParamThisPopupRef,
                               ParamWindowRef,
                               ParamNotifyClickedFunction,
                               ParamDivID,
                               ParamTextID,
                               ParamTimeout,
                               ParamOffsetX,
                               ParamOffsetY,
                               ParamWidth)
{
  'use strict';

  this.mThisPopupRef = ParamThisPopupRef;
  this.mWindowRef    = ParamWindowRef;
  this.mDivID        = ParamDivID;
  this.mTextID       = ParamTextID;
  this.mTimeout      = (ParamTimeout > 0) ? ParamTimeout : 0;
  this.mOffsetX      = ParamOffsetX;
  this.mOffsetY      = ParamOffsetY;
  this.mWidth        = ParamWidth;
  this.mImages       = [];

  // Updated when popup triggered
  //
  this.mbVisible     = false;
  this.mPositionX    = 0;
  this.mPositionY    = 0;
  this.mText         = "";
  this.mSetTimeoutID = null;

  this.fPreloadImages = HTMLHelpPopup_PreloadImages;
  this.fNotifyClicked = ParamNotifyClickedFunction;
  this.fFormat        = HTMLHelpPopup_Format;
  this.fDivTagText    = HTMLHelpPopup_DivTagText;
  this.fShow          = HTMLHelpPopup_Show;
  this.fLoad          = HTMLHelpPopup_Load;
  this.fPositionAt    = HTMLHelpPopup_PositionAt;
  this.fPosition      = HTMLHelpPopup_Position;
  this.fReveal        = HTMLHelpPopup_Reveal;
  this.fHide          = HTMLHelpPopup_Hide;

  // Preload graphics
  //
  this.fPreloadImages();
}

function  HTMLHelpPopup_PreloadImages()
{
  'use strict';

  this.mImages[this.mImages.length] = new Image(); this.mImages[this.mImages.length - 1].src = "images/spc1w2h.gif";
  this.mImages[this.mImages.length] = new Image(); this.mImages[this.mImages.length - 1].src = "images/spc2w1h.gif";
  this.mImages[this.mImages.length] = new Image(); this.mImages[this.mImages.length - 1].src = "images/spc1w7h.gif";
  this.mImages[this.mImages.length] = new Image(); this.mImages[this.mImages.length - 1].src = "images/spc5w1h.gif";
}

function  HTMLHelpPopup_Format(ParamWidth,
                               ParamTextID,
                               ParamText)
{
  'use strict';

  var VarHTML, BackgroundColor, BorderColor, ReqSpacer1w2h, ReqSpacer2w1h;

  VarHTML = "";
  BackgroundColor = "#FFFFCC";
  BorderColor     = "#999999";
  ReqSpacer1w2h   = "<img src=\"images/spc1w2h.gif\" width=\"1\" height=\"2\" alt=\"\">";
  ReqSpacer2w1h   = "<img src=\"images/spc2w1h.gif\" width=\"2\" height=\"1\" alt=\"\">";

  VarHTML += "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" bgcolor=\"" + BackgroundColor + "\">";
  VarHTML += " <tr>";
  VarHTML += "  <td height=\"2\" colspan=\"3\" bgcolor=\"" + BorderColor + "\">" + ReqSpacer1w2h + "</td>";
  VarHTML += " </tr>";

  VarHTML += " <tr>";
  VarHTML += "  <td bgcolor=\"" + BorderColor + "\">" + ReqSpacer2w1h + "</td>";
  VarHTML += "  <td id=\"" + ParamTextID + "\">" + ParamText + "</td>";
  VarHTML += "  <td bgcolor=\"" + BorderColor + "\">" + ReqSpacer2w1h + "</td>";
  VarHTML += " </tr>";

  VarHTML += " <tr>";
  VarHTML += "  <td height=\"2\" colspan=\"3\" bgcolor=\"" + BorderColor + "\">" + ReqSpacer1w2h + "</td>";
  VarHTML += " </tr>";
  VarHTML += "</table>";

  return VarHTML;
}

function  HTMLHelpPopup_DivTagText()
{
  'use strict';

  var VarDivTagText;

  // Emit DIV tag
  //
  VarDivTagText = "";
  VarDivTagText += "<div id=\"" + this.mDivID + "\" style=\"position: absolute ; z-index: -1 ; visibility: hidden ; display: none ; top: 0px ; left: 0px\" onclick=\"javascript:" + this.mThisPopupRef + ".fNotifyClicked();\">\n";
  VarDivTagText += this.fFormat(this.mWidth, this.mTextID, "Popup");
  VarDivTagText += "</div>\n";

  return VarDivTagText;
}

function  HTMLHelpPopup_Show(ParamText,
                             ParamEvent)
{
  'use strict';

  var PopupDocument;

  PopupDocument = eval(this.mWindowRef + ".document");

  // Hide popup
  //
  this.fHide();

  // Position at 0,0
  //
  this.fPositionAt(0, 0);

  // Reset the timeout operation to display the popup
  //
  if (this.mSetTimeoutID !== null)
  {
    window.clearTimeout(this.mSetTimeoutID);
    this.mSetTimeoutID = null;
  }

  // Check to see if there is anything to display
  //
  if ((ParamText !== null) &&
      (ParamEvent !== null))
  {
    if ((PopupDocument.documentElement !== undefined) &&
        (PopupDocument.documentElement.clientWidth !== undefined) &&
        (PopupDocument.documentElement.clientHeight !== undefined) &&
        ((PopupDocument.documentElement.scrollLeft !== 0) ||
         (PopupDocument.documentElement.scrollTop !== 0)))
    {
      this.mPositionX = PopupDocument.documentElement.scrollLeft + ParamEvent.x;
      this.mPositionY = PopupDocument.documentElement.scrollTop  + ParamEvent.y;
    }
    else
    {
      this.mPositionX = PopupDocument.body.scrollLeft + ParamEvent.x;
      this.mPositionY = PopupDocument.body.scrollTop  + ParamEvent.y;
    }

    this.mText = ParamText;

    // Load popup
    //
    this.fLoad();
  }
}

function  HTMLHelpPopup_Load()
{
  'use strict';

  var PopupDocument;

  PopupDocument = eval(this.mWindowRef + ".document");

  // Set popup contents
  //
  PopupDocument.all[this.mTextID].innerHTML = this.mText;

  // Block display mode
  //
  PopupDocument.all[this.mDivID].style.display = "block";

  // Reveal
  //
  this.mSetTimeoutID = window.setTimeout(this.mThisPopupRef + ".fReveal()", this.mTimeout);
}

function  HTMLHelpPopup_PositionAt(ParamX,
                                   ParamY)
{
  'use strict';

  var PopupDocument;

  PopupDocument = eval(this.mWindowRef + ".document");

  // Set popup position
  //
  PopupDocument.all[this.mDivID].style.pixelLeft = ParamX;
  PopupDocument.all[this.mDivID].style.pixelTop  = ParamY;
}

function  HTMLHelpPopup_Position()
{
  'use strict';

  var  PopupDocument, Margin, NewPositionX, NewPositionY, VisibleOffsetX, VisibleOffsetY, ScrollTop, PopupWidth, PopupHeight, DeltaY;

  PopupDocument = eval(this.mWindowRef + ".document");
  Margin = 8;

  // Calculate new position for popup
  //
  NewPositionX = this.mPositionX + this.mOffsetX;
  NewPositionY = this.mPositionY + this.mOffsetY;

  // Attempt to determine DIV tag dimensions
  //
  PopupWidth = this.mWidth;
  if (PopupDocument.all[this.mDivID].offsetWidth > PopupWidth)
  {
    PopupWidth = PopupDocument.all[this.mDivID].offsetWidth;
  }
  PopupHeight = 60;  // Guess a value
  if (PopupDocument.all[this.mDivID].offsetHeight > PopupHeight)
  {
    PopupHeight = PopupDocument.all[this.mDivID].offsetHeight;
  }

  // Calculate maximum values for X and Y such that the
  // popup will remain visible
  //
  if ((PopupDocument.documentElement !== undefined) &&
      (PopupDocument.documentElement.clientWidth !== undefined) &&
      (PopupDocument.documentElement.clientHeight !== undefined) &&
      ((PopupDocument.documentElement.clientWidth !== 0) ||
       (PopupDocument.documentElement.clientHeight !== 0)))
  {
    VisibleOffsetX = PopupDocument.documentElement.clientWidth  - this.mOffsetX - PopupWidth - Margin;
    VisibleOffsetY = PopupDocument.documentElement.clientHeight - this.mOffsetY - PopupHeight - Margin;
  }
  else
  {
    VisibleOffsetX = PopupDocument.body.clientWidth  - this.mOffsetX - PopupWidth - Margin;
    VisibleOffsetY = PopupDocument.body.clientHeight - this.mOffsetY - PopupHeight - Margin;
  }
  if (VisibleOffsetX < 0)
  {
    VisibleOffsetX = 0;
  }
  if (VisibleOffsetY < 0)
  {
    VisibleOffsetY = 0;
  }

  // Confirm popup will be visible and adjust if necessary
  //
  if ((PopupDocument.documentElement !== undefined) &&
      (PopupDocument.documentElement.clientWidth !== undefined) &&
      (PopupDocument.documentElement.clientHeight !== undefined) &&
      ((PopupDocument.documentElement.scrollLeft !== 0) ||
       (PopupDocument.documentElement.scrollTop !== 0)))
  {
    if (NewPositionX > (PopupDocument.documentElement.scrollLeft + VisibleOffsetX))
    {
      NewPositionX = PopupDocument.documentElement.scrollLeft + VisibleOffsetX;
    }
    ScrollTop = PopupDocument.documentElement.scrollTop;
    if (NewPositionY > (PopupDocument.documentElement.scrollTop + VisibleOffsetY))
    {
      NewPositionY = PopupDocument.documentElement.scrollTop + VisibleOffsetY;
    }
  }
  else
  {
    if (NewPositionX > (PopupDocument.body.scrollLeft + VisibleOffsetX))
    {
      NewPositionX = PopupDocument.body.scrollLeft + VisibleOffsetX;
    }
    ScrollTop = PopupDocument.body.scrollTop;
    if (NewPositionY > (PopupDocument.body.scrollTop + VisibleOffsetY))
    {
      NewPositionY = PopupDocument.body.scrollTop + VisibleOffsetY;
    }
  }

  // Relocate popup if it will overlay the current mouse position
  //
  if ((this.mPositionY >= NewPositionY) &&
      (this.mPositionY <= (NewPositionY + PopupHeight)))
  {
    DeltaY = (NewPositionY + PopupHeight) - this.mPositionY;
    if (NewPositionY - (DeltaY + Margin) > ScrollTop)
    {
      NewPositionY -= DeltaY + Margin;
    }
  }

  // Set popup position
  //
  this.fPositionAt(NewPositionX, NewPositionY);
}

function  HTMLHelpPopup_Reveal()
{
  'use strict';

  var PopupDocument;

  PopupDocument = eval(this.mWindowRef + ".document");

  if (this.mSetTimeoutID !== null)
  {
    // Position the popup
    //
    this.fPosition();

    // Show the popup
    //
    PopupDocument.all[this.mDivID].style.zIndex = 1;
    PopupDocument.all[this.mDivID].style.visibility = "visible";
    this.mbVisible = true;
  }

  // Clear the setTimeout ID tracking field
  // to indicate that we're done.
  //
  this.mSetTimeoutID = null;
}

function  HTMLHelpPopup_Hide()
{
  'use strict';

  var PopupDocument;

  // Cancel the setTimeout value that would have
  // displayed the popup
  //
  if (this.mSetTimeoutID !== null)
  {
    window.clearTimeout(this.mSetTimeoutID);
    this.mSetTimeoutID = null;
  }

  // Shutdown the popup
  //
  if (this.mbVisible === true)
  {
    PopupDocument = eval(this.mWindowRef + ".document");

    PopupDocument.all[this.mDivID].style.zIndex = -1;
    PopupDocument.all[this.mDivID].style.visibility = "hidden";
    PopupDocument.all[this.mDivID].style.display    = "none";
  }

  this.mbVisible = false;
}
