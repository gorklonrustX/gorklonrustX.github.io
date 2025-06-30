// Copyright (c) 2002-2013 Quadralay Corporation.  All rights reserved.
//
/*jslint maxerr: 50, indent: 2, white: true */
/*global window */

function  WebWorksDropDown_Object()
{
  'use strict';

  this.fWriteArrow    = WebWorksDropDown_WriteArrow;
  this.fWriteDIVOpen  = WebWorksDropDown_WriteDIVOpen;
  this.fWriteDIVClose = WebWorksDropDown_WriteDIVClose;
}

function  WebWorksDropDown_WriteArrow(ParamBaseURL,
                                      ParamID,
                                      bParamExpanded)
{
  'use strict';

  var VarIMGSrc;

  if ((window.document.all !== undefined) ||
      (window.document.getElementById !== undefined))
  {
    window.document.write(" <a href=\"javascript:WebWorksDropDown_ToggleDIV('" + ParamID + "');\">");

    if (bParamExpanded)
    {
      VarIMGSrc = ParamBaseURL + "images/expanded.gif";
    }
    else
    {
      VarIMGSrc = ParamBaseURL + "images/collapse.gif";
    }

    window.document.write("<img id=\"" + ParamID + "_arrow\" src=\"" + VarIMGSrc + "\" border=\"0\" alt=\"\">");
    window.document.write("</a>");
  }
}

function  WebWorksDropDown_WriteDIVOpen(ParamID,
                                        bParamExpanded)
{
  'use strict';

  if ((window.document.all !== undefined) ||
      (window.document.getElementById !== undefined))
  {
    if (bParamExpanded)
    {
      window.document.write("<div id=\"" + ParamID + "\" style=\"visibility: visible; display: block;\">");
    }
    else
    {
      window.document.write("<div id=\"" + ParamID + "\" style=\"visibility: hidden; display: none;\">");
    }
  }
}

function  WebWorksDropDown_WriteDIVClose()
{
  'use strict';

  if ((window.document.all !== undefined) ||
      (window.document.getElementById !== undefined))
  {
    window.document.write("</div>");
  }
}

function  WebWorksDropDown_ToggleDIV(ParamBaseURL,
                                     ParamID)
{
  'use strict';

  var VarImageID, VarIMG, VarDIV;

  VarImageID = ParamID + "_arrow";

  if (window.document.all !== undefined)
  {
    // Reference image
    //
    VarIMG = window.document.all[VarImageID];
    if ((VarIMG !== undefined) &&
        (VarIMG !== null))
    {
      // Nothing to do
    }
    else
    {
      VarIMG = null;
    }

    // Reference DIV tag
    //
    VarDIV = window.document.all[ParamID];
    if ((VarDIV !== undefined) &&
        (VarDIV !== null))
    {
      if (VarDIV.style.display === "block")
      {
        if (VarIMG !== null)
        {
          VarIMG.src = ParamBaseURL + "images/collapse.gif";
        }

        VarDIV.style.visibility = "hidden";
        VarDIV.style.display = "none";
      }
      else
      {
        if (VarIMG !== null)
        {
          VarIMG.src = ParamBaseURL + "images/expanded.gif";
        }

        VarDIV.style.visibility = "visible";
        VarDIV.style.display = "block";
      }
    }
  }
  else if (window.document.getElementById !== undefined)
  {
    // Reference image
    //
    VarIMG = window.document[VarImageID];
    if ((VarIMG !== undefined) &&
        (VarIMG !== null))
    {
      // Nothing to do
    }
    else
    {
      VarIMG = null;
    }

    // Reference DIV tag
    //
    VarDIV = window.document.getElementById(ParamID);
    if ((VarDIV !== undefined) &&
        (VarDIV !== null))
    {
      if (VarDIV.style.display === "block")
      {
        if (VarIMG !== null)
        {
          VarIMG.src = ParamBaseURL + "images/collapse.gif";
        }

        VarDIV.style.visibility = "hidden";
        VarDIV.style.display = "none";
      }
      else
      {
        if (VarIMG !== null)
        {
          VarIMG.src = ParamBaseURL + "images/expanded.gif";
        }

        VarDIV.style.visibility = "visible";
        VarDIV.style.display = "block";
      }
    }
  }
}
