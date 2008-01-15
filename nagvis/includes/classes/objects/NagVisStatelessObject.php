<?php
/**
 * Class of a Host in Nagios with all necessary informations
 *
 * @author	Lars Michelsen <lars@vertical-visions.de>
 */
class NagVisStatelessObject extends NagVisObject {
	var $MAINCFG;
	var $LANG;
	
	// "Global" Configuration variables for all stateless objects
	var $label_show;
	var $recognize_services;
	var $only_hard_states;
	
	var $iconPath;
	var $iconHtmlPath;
	
	/**
	 * Class constructor
	 *
	 * @param		Object 		Object of class GlobalMainCfg
	 * @param		Object 		Object of class GlobalLanguage
	 * @author	Lars Michelsen <lars@vertical-visions.de>
	 */
	function NagVisStatelessObject(&$MAINCFG, &$LANG) {
		$this->MAINCFG = &$MAINCFG;
		$this->LANG = &$LANG;
		
		parent::NagVisObject($this->MAINCFG, $this->LANG);
	}
	
	/**
	 * PUBLIC fetchMembers()
	 *
	 * Just a dummy here
	 *
	 * @author	Lars Michelsen <lars@vertical-visions.de>
	 */
	function fetchMembers() {
	}
	
	/**
	 * Calculates the position of the line hover area
	 *
	 * @author 	Lars Michelsen <lars@vertical-visions.de>
	 */
	function getLineHoverArea() {
		
		list($xFrom,$xTo) = explode(',', $this->x);
		list($yFrom,$yTo) = explode(',', $this->y);
		
		$this->x = $this->GRAPHIC->middle($xFrom,$xTo) - 10;
		$this->y = $this->GRAPHIC->middle($yFrom,$yTo) - 10;
		$this->icon = '20x20.gif';
		
	}
	
	
	/**
	 * Parses the HTML-Code of an icon
	 *
	 * @param	Boolean	$link		Add a link to the icon
	 * @param	Boolean	$hoverMenu	Add a hover menu to the icon
	 * @return	String	String with Html Code
	 * @author	Lars Michelsen <lars@vertical-visions.de>
	 */
	function parseIcon() {
		
		if(preg_match('/^\[(.*)\]$/',$this->icon,$match) > 0) {
			$imgPath = $match[1];
		} else {
			$imgPath = $this->iconHtmlPath.$this->icon;
		}
		
		$ret = '<div class="icon" style="left:'.$this->x.'px;top:'.$this->y.'px;z-index:'.$this->z.';">';
		$ret .= $this->createLink();
		$ret .= '<img src="'.$imgPath.'" '.$this->getHoverMenu().' alt="'.$this->type.'-'.$this->icon.'">';
		$ret .= '</a>';
		$ret .= '</div>';
		
		return $ret;
	}
}
?>
