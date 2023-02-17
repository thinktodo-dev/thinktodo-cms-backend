export const changeDomain = (
    data,
    originDomain: string,
    replaceDomain: string
  ) => {
    const objectData = data;
    if (typeof objectData === "object" && !Array.isArray(objectData)) {
      for (const key in objectData) {
        if (typeof objectData[key] === "string") {
          if (objectData[key].indexOf(originDomain) !== -1) {
            objectData[key] = objectData[key].replace(
              originDomain,
              replaceDomain
            );
          }
        } else {
          objectData[key] = changeDomain(
            objectData[key],
            originDomain,
            replaceDomain
          );
        }
      }
    } else if (typeof objectData === "object" && Array.isArray(objectData)) {
      for (let index = 0; index < objectData.length; index++) {
        if (typeof objectData[index] === "string") {
          if (objectData[index].indexOf(originDomain) !== -1) {
            objectData[index] = objectData[index].replace(
              originDomain,
              replaceDomain
            );
          }
        } else {
          objectData[index] = changeDomain(
            objectData[index],
            originDomain,
            replaceDomain
          );
        }
      }
    }
    return objectData;
  };
  