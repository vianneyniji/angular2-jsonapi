import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import { JsonApiModel } from '../models/json-api.model';
import { JsonApiQueryData } from '../models/json-api-query-data';
import { DatastoreConfig } from '../interfaces/datastore-config.interface';
export declare type ModelType<T extends JsonApiModel> = {
    new (datastore: JsonApiDatastore, data: any): T;
};
export declare class JsonApiDatastore {
    private http;
    private _headers;
    private _store;
    protected config: DatastoreConfig;
    constructor(http: Http);
    /** @deprecated - use findAll method to take all models **/
    query<T extends JsonApiModel>(modelType: ModelType<T>, params?: any, headers?: Headers, customUrl?: string): Observable<T[]>;
    findAll<T extends JsonApiModel>(modelType: ModelType<T>, params?: any, headers?: Headers, customUrl?: string): Observable<JsonApiQueryData<T>>;
    findRecord<T extends JsonApiModel>(modelType: ModelType<T>, id: string, params?: any, headers?: Headers, customUrl?: string): Observable<T>;
    createRecord<T extends JsonApiModel>(modelType: ModelType<T>, data?: any): T;
    private getDirtyAttributes(attributesMetadata);
    saveRecord<T extends JsonApiModel>(attributesMetadata: any, model: T, params?: any, headers?: Headers, customUrl?: string): Observable<T>;
    deleteRecord<T extends JsonApiModel>(modelType: ModelType<T>, id: string, headers?: Headers, customUrl?: string): Observable<Response>;
    peekRecord<T extends JsonApiModel>(modelType: ModelType<T>, id: string): T | null;
    peekAll<T extends JsonApiModel>(modelType: ModelType<T>): T[];
    headers: Headers;
    private buildUrl<T>(modelType, params?, id?, customUrl?);
    private getRelationships(data);
    private isValidToManyRelation(objects);
    private buildSingleRelationshipData(model);
    private extractQueryData<T>(res, modelType, withMeta?);
    private deserializeModel<T>(modelType, data);
    private extractRecordData<T>(res, modelType, model?);
    protected handleError(error: any): ErrorObservable;
    protected parseMeta(body: any, modelType: ModelType<JsonApiModel>): any;
    private getOptions(customHeaders?);
    private toQueryString(params);
    addToStore(modelOrModels: JsonApiModel | JsonApiModel[]): void;
    private resetMetadataAttributes<T>(res, attributesMetadata, modelType);
    private updateRelationships(model, relationships);
    private readonly datastoreConfig;
    private transformSerializedNamesToPropertyNames<T>(modelType, attributes);
    private getModelPropertyNames(model);
}
