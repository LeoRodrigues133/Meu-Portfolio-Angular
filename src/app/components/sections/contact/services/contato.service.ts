import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class contatoService {

    readonly baseUrl = environment.API_URL;

    constructor(private http: HttpClient) {

    }

    sendEmail(contactData: {
        name: string;
        email: string;
        phone?: string;
        whatsapp:string;
        subject:string
        message: string;
    }): Observable<any> {
        const sendUrl = `${this.baseUrl}send-email`;
        return this.http.post<any>(sendUrl, contactData);
    }
}