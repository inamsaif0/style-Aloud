import { raw } from "objection";
import { Users } from "src/libs/database/entities/user.entity";
// import { Reporting } from "../database/entities/reporting.entity";

export class Helper {
  static async changeUserStatus (userId, status) {
    if (userId) {
      await Users.query().updateAndFetchById(userId, { user_status: status })
      let user: any = await Users.query().where({ id: userId }).first();
      return user ? user : null;
    }
    return null;
  }


  static async deviceTokenByUsers (userId) {
    let users: any = await Users.query().where('id', userId).first();
    return users.device_token ? users.device_token : null
  }
  static async multipleDeviceTokenByUsers ({ids}) {
       let userIds:any = await Users.query().select("device_token").whereNotNull("device_token").findByIds(ids)
       
       return userIds;

    // for (const iterator of ids) {
      
    // }

    // let  userIds = userIds.filter(x=>x.device_token != null ).map((x).de)
    // let users: any = await Users.query().where('id', userId).first();
    // return userIds?das  .device_token ? users.device_token : null
  }

}

