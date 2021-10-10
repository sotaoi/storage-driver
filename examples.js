const fs = require('fs');
const path = require('path');

const main = async () => {
  const StorageDriver = new (require('@sotaoi/storage-driver').StorageDriver)(
    'https://alarmion.ddns.net',
    'alarmion',
    'alarmion-client-id',
    'alarmion-secret',
    'storage',
  );

  try {
    const result = await StorageDriver.removeAsset('profileyy.jpg');
    result.success ? console.log(result) : console.error(result);
  } catch (err) {
    console.error(err);
  }

  try {
    const result = await StorageDriver.checkAssetUrl('https://alarmion.ddns.net/alarmion/storage/flp.jpg');
    result.success ? console.log(result) : console.error(result);
  } catch (err) {
    console.error(err);
  }

  try {
    const result = await StorageDriver.checkAssetUrl('https://alarmion.ddns.net/alarmion/storage/flpno.jpg');
    result.success ? console.log(result) : console.error(result);
  } catch (err) {
    console.error(err);
  }

  try {
    const result = await StorageDriver.checkAssetFilepath('flp.jpg');
    result.success ? console.log(result) : console.error(result);
  } catch (err) {
    console.error(err);
  }

  try {
    const result = await StorageDriver.checkAssetFilepath('flpno.jpg');
    result.success ? console.log(result) : console.error(result);
  } catch (err) {
    console.error(err);
  }

  try {
    const result = await StorageDriver.checkDocpath('flp.jpg');
    result.success ? console.log(result) : console.error(result);
    fs.existsSync(path.resolve('flp.jpg')) && fs.unlinkSync(path.resolve('flp.jpg'));
  } catch (err) {
    console.error(err);
  }

  try {
    const result = await StorageDriver.checkDocpath('flpno.jpg');
    result.success ? console.log(result) : console.error(result);
  } catch (err) {
    console.error(err);
  }

  try {
    const result = await StorageDriver.storeDoc('profile.jpg', fs.createReadStream(path.resolve('profile.jpg')));
    result.success ? console.log(result) : console.error(result);
  } catch (err) {
    console.error(err);
  }

  try {
    const result = await StorageDriver.removeDoc('profileyy.jpg');
    result.success ? console.log(result) : console.error(result);
  } catch (err) {
    console.error(err);
  }

  try {
    const blobPath = path.resolve('./blob.jpg');
    const doc = await StorageDriver.retrieveDoc('profile.jpg');
    fs.writeFileSync(blobPath, Buffer.from(await doc.arrayBuffer()));
  } catch (err) {
    console.error(err);
  }
};

main();
