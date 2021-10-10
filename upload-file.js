const main = async () => {
  const StorageDriver = new (require('@sotaoi/storage-driver').StorageDriver)(
    'https://alarmion.ddns.net',
    'alarmion',
    'alarmion-client-id',
    'alarmion-secret',
    'storage',
  );

  // try {
  //   const result = await StorageDriver.removeAsset('profileyy.jpg');
  //   result.success ? console.log(result) : console.error(result);
  // } catch (err) {
  //   console.error(err);
  // }

  try {
    const result = await StorageDriver.checkAssetUrl('https://alarmion.ddns.net/alarmion/storage/flp.jpg');
    result.success ? console.log(result) : console.error(result);
  } catch (err) {
    console.error(err);
  }
};

main();
