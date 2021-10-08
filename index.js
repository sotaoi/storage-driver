class StorageDriver {
  storageUrl = null;
  clientSecret = null;
  clientId = null;
  clientKey = null;

  constructor(storageUrl, clientSecret, clientId, clientKey, preferSecure) {
    if (typeof storageUrl === 'string') {
      while (storageUrl.charAt(storageUrl.lenght - 1) === '/') {
        storageUrl = storageUrl.substr(0, storageUrl.length - 1);
      }
      if (storageUrl.substr(0, 7) !== 'http' && storageUrl.substr(0, 8) !== 'https') {
        storageUrl = preferSecure ? `https://${storageUrl}` : `http://${storageUrl}`;
      }
    }
    this.storageUrl = storageUrl;
    this.clientSecret = clientSecret || null;
    this.clientId = clientId || null;
    this.clientKey = clientKey || null;
  }

  // alias for assetLink(filepath)
  alink(filepath) {
    return this.assetLink(filepath);
  }
  assetLink(filepath) {
    if (
      typeof this.storageUrl !== 'string' ||
      typeof this.clientKey !== 'string' ||
      typeof this.filepath !== 'string'
    ) {
      return null;
    }
    return `${this.storageUrl}/asset/${this.clientKey}/${filepath}`;
  }
}
