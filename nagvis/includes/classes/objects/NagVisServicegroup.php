<?php
/*****************************************************************************
 *
 * NagVisServicegroup.php - Class of a Servicegroup in NagVis with all necessary 
 *                  informations which belong to the object handling in NagVis
 *
 * Copyright (c) 2004-2008 NagVis Project (Contact: lars@vertical-visions.de)
 *
 * License:
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 2 as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 *
 *****************************************************************************/
 
/**
 * @author	Lars Michelsen <lars@vertical-visions.de>
 */
class NagVisServicegroup extends NagiosServicegroup {
	var $CORE;
	var $BACKEND;
	
	/**
	 * Class constructor
	 *
	 * @param		Object 		Object of class GlobalMainCfg
	 * @param		Object 		Object of class GlobalBackendMgmt
	 * @param		Object 		Object of class GlobalLanguage
	 * @param		Integer 	ID of queried backend
	 * @param		String		Name of the servicegroup
	 * @author	Lars Michelsen <lars@vertical-visions.de>
	 */
	function NagVisServicegroup(&$CORE, &$BACKEND, $backend_id, $servicegroupName) {
		$this->CORE = &$CORE;
		
		$this->BACKEND = &$BACKEND;
		$this->type = 'servicegroup';
		$this->iconset = 'std_medium';
		parent::NagiosServicegroup($this->CORE, $this->BACKEND, $backend_id, $servicegroupName);
	}
	
	/**
	 * PUBLIC parse()
	 *
	 * Parses the object
	 *
	 * @return	String		HTML code of the object
	 * @author	Lars Michelsen <lars@vertical-visions.de>
	 */
	function parse() {
		return parent::parse();
	}
	
	# End public methods
	# #########################################################################
	
	/**
	 * PRIVATE getUrl()
	 *
	 * Returns the url for the object link
	 *
	 * @return	String	URL
	 * @author 	Lars Michelsen <lars@vertical-visions.de>
	 */
	function getUrl() {
		if(isset($this->url) && $this->url != '') {
			$url = parent::getUrl();
		} else {
			$url = $this->CORE->MAINCFG->getValue('backend_'.$this->backend_id, 'htmlcgi').'/status.cgi?servicegroup='.$this->servicegroup_name.'&style=detail';
		}
		return $url;
	}
}
?>
