function isRepeat(arr){
 
    var hash = {};
     
    for(var i in arr) {
     
    if(hash[arr[i]])
     
    return true;
     
    hash[arr[i]] = true;
     
    }
    return false;
     
}
var rule={
    isRepeat:(rule,value,callback)=>{
        if(isRepeat(value)){
            return callback(new Error('输入重复'));
        }else{
            callback();
        }
    },
    noChinese: (rule, value, callback) => {
	    if (/[\u4E00-\u9FA5]/g.test(value)) {
	      return callback(new Error('请勿输入中文'));
	    }else{
	    	callback();
	    }
	},
	hexadecimal: (rule, value, callback) => {
	    if (!/^[0-9a-fA-F]{1,}$/.test(value)) {
	      return callback(new Error('必须为十六进制字符'));
	    }else{
	    	callback();
	    }
    },
    //长度校验
    length1:function(len,msg){
        var data='长度过长';
        if(msg){
            data=msg
        }
        return [{ validator: (rule,value,callback)=>{
            value=value?value:''
            if(value.length>len){
                return callback(new Error('长度过长'));
            } else {
                callback();
            }
        }, message: data, trigger: 'blur' }]
    },
	require:function(type,msg){
        var data='此项不能为空';
        if(msg){
            data=msg
        }
		if(type!='string'){
			return [{ required: true,type:type, message: data, trigger: 'change' }]
		}else{
			return [{ required: true, message: data, trigger: 'change' },{ validator: (rule, value, callback) => {
                if (/^\s*$/.test(value)) {
                  callback(new Error('不可为全空格'));
                } else {
                  callback();
                }
            }, trigger: 'change' }]
		}	
	},
	  /* 手机号 */
    phone: (rule, value, callback) => {
        if (!/^1[34578]\d{9}$/.test(value)) {
        return callback(new Error("请输入正确的手机号码"));
        } else {
        callback();
        }
    },
    /* 身份证 */
    IDcard: (rule, value, callback) => {
        if (
        !/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(
            value
        )
        ) {
        return callback(new Error("请输入正确的身份证号码"));
        } else {
        callback();
        }
    },
    // 邮箱
    email: (rule, value, callback) => {
        if (
        !/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(
            value
        )
        ) {
        return callback(new Error("请输入正确的邮箱"));
        } else {
        callback();
        }
    },
  // 中文名
    chineseName: (rule, value, callback) => {
        if (!/^[\u4e00-\u9fa5]{2,4}$/.test(value)) {
        return callback(new Error("请输入正确的中文名"));
        } else {
        callback();
        }
    },
    // 英文名
    EnglishName: (rule, value, callback) => {
        if (value&&!/^[a-zA-Z\/ ]{2,20}$/.test(value)) {
        return callback(new Error("请输入正确的英文名"));
        } else {
        callback();
        }
    },
    //为空校验
    isEmpty:(rule, value, callback)=>{
        if(/^\s{0,}$/.test(value)){
        return callback(new Error("输入不能为空"));
        }else {
        callback();
        }
    },
    //京东用户名注册格式
    isUserName:(rule, value, callback)=>{
        if(!/^[\u4e00-\u9fa5\w_-]{4,20}$/.test(value)){
        return callback(new Error("用户名输入格式有误"));
        }else {
        callback();
        }
    },
   //京东密码注册格式
    isPassword:(rule, value, callback)=>{
        if(!/^.{6,20}$/.test(value)){
        return callback(new Error("密码输入格式有误"));
        }else {
        callback();
        }   
    },
    credit:(rule,value,callback)=>{
        if(!/[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}/g.test(value)){
            return callback(new Error("统一社会信用代码输入格式有误"));
        }else {
            callback();
        }  
    }
}
export default rule