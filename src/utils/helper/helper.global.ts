import { raw, val } from "objection";
import { Guest } from "src/libs/database/entities/guest.entity";
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
  static async getAllUsersIds () {
    let userIds:any = await Users.query().select("id").whereNotNull("device_token")
    console.log('these are user ids',userIds);
    return userIds;
  }
  static async getAllGuestIds (device_token) {
    let data:any = await Guest.query().where({device_token:device_token})
    if(data){
      let value:any = await Guest.query().updateAndFetchById(data.id,{device_token:device_token})
      return value;
    }
    let userIds:any = await Guest.query().select("id").whereNotNull("device_token")
    console.log('these are user ids',userIds);
    return userIds;
  }

  static async getAllIds () {
    let userIds:any = await Guest.query().select("id")
    console.log(userIds)
    return userIds;
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
  static async multipleDeviceTokenByGuest({ ids }) {
    try {
        // Query the Guest table for device tokens associated with the provided IDs
        let userIds: any[] = await Guest.query()
                                       .select("device_token")
                               

        // Extract device tokens from the array of objects
        let deviceTokens: string[] = userIds.map(user => user.device_token);
        
        console.log('Device tokens:', deviceTokens);

        return deviceTokens;
    } catch (error) {
        console.error('Error fetching device tokens:', error);
        throw error;
    }
}
}

