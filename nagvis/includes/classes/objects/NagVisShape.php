<?php
/**
 * Class of a Host in Nagios with all necessary informations
 *
 * @author	Lars Michelsen <lars@vertical-visions.de>
 */
class NagVisShape extends NagVisStatelessObject {
	var $MAINCFG;
	var $LANG;
	
	/**
	 * Class constructor
	 *
	 * @param		Object 		Object of class GlobalMainCfg
	 * @param		Object 		Object of class GlobalBackendMgmt
	 * @param		Object 		Object of class GlobalLanguage
	 * @param		String	 	Image of the shape
	 * @author	Lars Michelsen <lars@vertical-visions.de>
	 */
	function NagVisShape(&$MAINCFG, &$LANG, $icon) {
		$this->MAINCFG = &$MAINCFG;
		$this->LANG = &$LANG;
		
		$this->iconPath = $this->MAINCFG->getValue('paths', 'shape');
		$this->iconHtmlPath = $this->MAINCFG->getValue('paths', 'htmlshape');
		
		$this->icon = $icon;
		$this->type = 'shape';
		parent::NagVisStatelessObject($this->MAINCFG, $this->LANG);
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
		return $this->parseIcon();
	}
	
	/**
	 * Gets the hover menu of a shape if it is requested by configuration
	 *
	 * @return	String	The Link
	 * @author 	Lars Michelsen <lars@vertical-visions.de>
	 */
	function getHoverMenu() {
		if(isset($this->hover_url) && $this->hover_url != '') {
			parent::getHoverMenu();
		}
	}
	
	/**
	 * Creates a link to Nagios, when this is not set in the Config-File
	 *
	 * @return	String	The Link
	 * @author 	Lars Michelsen <lars@vertical-visions.de>
	 */
	function createLink() {
		
		if(isset($this->url) && $this->url != '') {
			$link = parent::createLink();  
		} else {
			$link = '';
		}
		
		return $link;
	}
	
	/**
	 * Just a dummy here (Shape won't need an icon)
	 *
	 * @author	Lars Michelsen <lars@vertical-visions.de>
	 */
	function fetchIcon() {
		// Nothing to do here, icon is set in constructor
	}
}
?>
