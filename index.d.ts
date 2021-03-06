declare class StorageDriver {
  public storageUrl: null | string;
  public clientName: null | string;
  public clientId: null | string;
  public clientSecret: null | string;
  public clientKey: null | string;

  constructor(
    storageUrl: string,
    clientName: string,
    clientId: string,
    clientSecret: null | string,
    clientKey: string,
    preferSecure: boolean,
  );

  assetLink(filepath: undefined | null | string): null | string;
  // alias for assetLink(filepath)
  alink(filepath: undefined | null | string): null | string;

  storeAsset(filepath: undefined | null | string, asset: string | NodeJS.ArrayBufferView): Promise<any>;

  removeAsset(filepath: undefined | null | string): Promise<any>;

  checkAssetUrl(url: undefined | null | string): Promise<any>;

  checkAssetFilepath(filepath: undefined | null | string): Promise<any>;

  storeDoc(docpath: undefined | null | string, doc: string | NodeJS.ArrayBufferView): Promise<any>;

  retrieveDoc(docpath: undefined | null | string): Promise<any>;

  removeDoc(docpath: undefined | null | string): Promise<any>;

  checkDocpath(docpath: undefined | null | string): Promise<any>;
}

export { StorageDriver };
