// Copyright (c) 2002-2013 Quadralay Corporation.  All rights reserved.
//
/*jslint maxerr: 50, indent: 2, white: true */
/*global window */

function  WebWorksSeeAlso_Object()
{
  'use strict';

  this.mSetTimeoutID = null;

  this.fOnClickButton = WebWorksSeeAlso_OnClickButton;
  this.fOnClickLink   = WebWorksSeeAlso_OnClickLink;
  this.fShowSeeAlso   = WebWorksSeeAlso_ShowSeeAlso;
}

function  WebWorksSeeAlso_OnClickButton(ParamSeeAlsoObjectID)
{
  'use strict';

  if (this.mSetTimeoutID === null)
  {
    this.mSetTimeoutID = window.setTimeout("window.WebWorksSeeAlso.fShowSeeAlso(\"" + ParamSeeAlsoObjectID + "\");", 10);
  }
}

function  WebWorksSeeAlso_OnClickLink(ParamSeeAlsoObjectID)
{
  'use strict';

  if (this.mSetTimeoutID === null)
  {
    this.mSetTimeoutID = window.setTimeout("window.WebWorksSeeAlso.fShowSeeAlso(\"" + ParamSeeAlsoObjectID + "\");", 10);
  }
}

function  WebWorksSeeAlso_ShowSeeAlso(ParamSeeAlsoObjectID)
{
  'use strict';

  var VarSeeAlsoObject;

  // Insure target object exists
  //
  VarSeeAlsoObject = eval("window.document." + ParamSeeAlsoObjectID);
  if ((VarSeeAlsoObject !== null) &&
      (VarSeeAlsoObject !== undefined))
  {
    // Show see also control
    //
    window.setTimeout("window.document." + ParamSeeAlsoObjectID + ".Click();", 1);
  }

  this.mSetTimeoutID = null;
}
