/**
 * @copyright 2010, Ajax.org B.V.
 * @license GPLv3 <http://www.gnu.org/licenses/gpl.txt>
 */

require("./requireJS-node");

var defaultResolver = module.constructor._resolveFilename;

var Resolves = {"sys":"util"};

module.constructor._resolveFilename = function(request, parent) {
    
    if (Resolves[request]){
        return defaultResolver(Resolves[request],parent);
    } else {
        return defaultResolver(request,parent);
    };
    
};