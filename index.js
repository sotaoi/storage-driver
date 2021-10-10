const FormData = require('form-data');
const { fetch } = require('cross-fetch');

class StorageDriver {
  constructor(storageUrl, clientName, clientId, clientSecret, clientKey, preferSecure) {
    this.storageUrl = null;
    this.clientName = null;
    this.clientId = null;
    this.clientSecret = null;
    this.clientKey = null;

    if (typeof storageUrl === 'string') {
      while (storageUrl.charAt(storageUrl.length - 1) === '/') {
        storageUrl = storageUrl.substr(0, storageUrl.length - 1);
      }
      if (storageUrl.substr(0, 7) !== 'http://' && storageUrl.substr(0, 8) !== 'https://') {
        storageUrl = preferSecure ? `https://${storageUrl}` : `http://${storageUrl}`;
      }
    }
    this.storageUrl = storageUrl;
    this.clientName = clientName || null;
    this.clientId = clientId || null;
    this.clientSecret = clientSecret || null;
    this.clientKey = clientKey || null;
  }

  // alias for assetLink(filepath)
  alink(filepath) {
    return this.assetLink(filepath);
  }
  assetLink(filepath) {
    if (typeof this.storageUrl !== 'string' || typeof this.clientKey !== 'string' || typeof filepath !== 'string') {
      return null;
    }
    while (filepath.charAt(0) === '/') {
      filepath = filepath.substr(1, filepath.length - 1);
    }
    return `${this.storageUrl}/asset/${this.clientKey}/${filepath}`;
  }

  //

  // read asset dir
  // read doc dir

  //

  storeAsset(filepath, asset) {
    return new Promise((resolve, reject) => {
      const form = new FormData();
      form.append('clientName', this.clientName);
      form.append('clientId', this.clientId);
      form.append('clientSecret', this.clientSecret);
      form.append('filepath', filepath);
      form.append('asset', asset);

      form.submit(`${this.storageUrl}/asset/store`, (err, res) => {
        try {
          if (err) {
            reject(err);
            return;
          }

          const chunks = [];
          res.on('data', (chunk) => {
            chunks.push(chunk);
          });
          res.on('end', () => {
            const result = JSON.parse(Buffer.concat(chunks).toString());
            result.success ? resolve(result) : reject(result);
          });

          res.resume();
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  async removeAsset(filepath) {
    return await new Promise((resolve, reject) => {
      const form = new FormData();
      form.append('clientName', this.clientName);
      form.append('clientId', this.clientId);
      form.append('clientSecret', this.clientSecret);
      form.append('filepath', filepath);

      form.submit(`${this.storageUrl}/asset/remove`, (err, res) => {
        try {
          if (err) {
            reject(err);
            return;
          }

          const chunks = [];
          res.on('data', (chunk) => {
            chunks.push(chunk);
          });
          res.on('end', () => {
            const result = JSON.parse(Buffer.concat(chunks).toString());
            result.success ? resolve(result) : reject(result);
          });

          res.resume();
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  async checkAssetUrl(url) {
    const formData = new FormData();
    formData.append('clientName', this.clientName);
    formData.append('clientId', this.clientId);
    formData.append('clientSecret', this.clientSecret);
    formData.append('clientKey', this.clientKey);
    formData.append('url', url);
    return await (
      await fetch(`${this.storageUrl}/asset/check-url`, {
        method: 'POST',
        body: formData,
      })
    ).json();
  }

  async checkAssetFilepath(filepath) {
    const formData = new FormData();
    formData.append('clientName', this.clientName);
    formData.append('clientId', this.clientId);
    formData.append('clientSecret', this.clientSecret);
    formData.append('clientKey', this.clientKey);
    formData.append('filepath', filepath);
    return await (
      await fetch(`${this.storageUrl}/asset/check-filepath`, {
        method: 'POST',
        body: formData,
      })
    ).json();
  }

  storeDoc(docpath, doc) {
    return new Promise((resolve, reject) => {
      const form = new FormData();
      form.append('clientName', this.clientName);
      form.append('clientId', this.clientId);
      form.append('clientSecret', this.clientSecret);
      form.append('docpath', docpath);
      form.append('doc', doc);

      form.submit(`${this.storageUrl}/doc/store`, (err, res) => {
        try {
          if (err) {
            reject(err);
            return;
          }

          const chunks = [];
          res.on('data', (chunk) => {
            chunks.push(chunk);
          });
          res.on('end', () => {
            const result = JSON.parse(Buffer.concat(chunks).toString());
            result.success ? resolve(result) : reject(result);
          });

          res.resume();
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  async retrieveDoc(docpath) {
    const formData = new FormData();
    formData.append('clientName', this.clientName);
    formData.append('clientId', this.clientId);
    formData.append('clientSecret', this.clientSecret);
    formData.append('docpath', docpath);
    return await (
      await fetch(`${this.storageUrl}/doc/retrieve`, {
        method: 'POST',
        body: formData,
      })
    ).blob();
  }

  async removeDoc(docpath) {
    return await new Promise((resolve, reject) => {
      const form = new FormData();
      form.append('clientName', this.clientName);
      form.append('clientId', this.clientId);
      form.append('clientSecret', this.clientSecret);
      form.append('docpath', docpath);

      form.submit(`${this.storageUrl}/doc/remove`, (err, res) => {
        try {
          if (err) {
            reject(err);
            return;
          }

          const chunks = [];
          res.on('data', (chunk) => {
            chunks.push(chunk);
          });
          res.on('end', () => {
            const result = JSON.parse(Buffer.concat(chunks).toString());
            result.success ? resolve(result) : reject(result);
          });

          res.resume();
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  async checkDocpath(docpath) {
    const formData = new FormData();
    formData.append('clientName', this.clientName);
    formData.append('clientId', this.clientId);
    formData.append('clientSecret', this.clientSecret);
    formData.append('docpath', docpath);
    return await (
      await fetch(`${this.storageUrl}/doc/check-docpath`, {
        method: 'POST',
        body: formData,
      })
    ).json();
  }
}

module.exports = { StorageDriver };
