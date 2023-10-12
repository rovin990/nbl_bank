class User{

    constructor(id, name, mobileNumber, email , pwd, role ,statusCd,statusMsg , authStatus ) {
        this.id=id;
        this.name=name;
        this.mobileNumber=mobileNumber;
        this.email=email;
        this.pwd=pwd;
        this.role=role;
        this.statusCd=statusCd;
        this.statusMsg=statusMsg;
        this.authStatus=authStatus
    }
}

export default User;