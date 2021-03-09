const TOKEN = 'TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';

const lineApiAddress = "http://cloud.mypoof.com/";
const testApiAddress = "http://test.poofserver.com/";

let defaultApiAddress = testApiAddress;

if ( window.document.body.getAttribute("data-constraint-api-address") ) {
	defaultApiAddress = window.document.body.getAttribute("data-constraint-api-address");
}

const API_DOMAIN = defaultApiAddress + 'api/key/' + TOKEN + '/'; 
const USER_DOMAIN = API_DOMAIN;  
//API
export default {
	TREATS : {
		GET_TREATS_LIST : USER_DOMAIN + 'treats_list',
		GET_TREATS_DETAIL : USER_DOMAIN + 'treats_detail',
		GET_HISTORY_LIST : USER_DOMAIN + 'treats_history_list',
		GET_TREATS_USER_INFO : USER_DOMAIN + 'treats_user_info',
		GET_TREATS_DETAIL_AFTER : USER_DOMAIN + 'treats_detail_after_reddemed',
		POST_REDEEM : USER_DOMAIN + 'treats_reward_redeem'
	},
	TOKEN : TOKEN
};