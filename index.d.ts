declare class StorageDriver {
  public storageUrl: null | string;
  public clientSecret: null | string;
  public clientId: null | string;
  public clientKey: null | string;

  constructor(
    storageUrl: string,
    clientSecret: null | string,
    clientId: string,
    clientKey: string,
    preferSecure: string,
  );

  // alias for assetLink(filepath)
  alink(filepath: undefined | null | string): null | string;
  assetLink(filepath: undefined | null | string): null | string;
}

export { StorageDriver };
