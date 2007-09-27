<?PHP
/**
 * Here are defined some constants for use in NagVis and WUI
 *
 * @author      Lars Michelsen <lars@vertical-visions.de>
 */

define('DEBUG',FALSE);
/**
 * For wanted debug output summarize these possible options:
 * 1: function beginning and ending
 * 2: progres informations in the functions
 * 4: render time
 */
define('DEBUGLEVEL', 1);
define('DEBUGFILE', '/var/log/nagvis-debug.log');

define('CONST_VERSION', '1.2a1');
define('CONST_MAINCFG', '../etc/nagvis-config.ini.php');
?>
