import { CreateUserInfoRequest } from "../../request/user/user-info/create-user-info-request";
import { CreateUserJoinRequest } from "../../request/user/user-join/create-user-join-request";

export class OrderResponse{
    id?: number;
    dateBook?: Date;
    totalPrice?: number;
    idUser?: number;
    paymentMethod?: number;
}