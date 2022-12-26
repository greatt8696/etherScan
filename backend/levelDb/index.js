const increase = (db, value = 1) => {};

(async () => {
  const { Level } = require("level");

  // Create a database
  const db = new Level("counter", { valueEncoding: "json" });
  const getCounter = async function (db) {
    await db.get("counter");
  };

  const increase = async (db, value = 1) => {
    const prevValue = await db.get("counter");
    await db.put("counter");
  };

  // Add an entry with key 'a' and value 1
  await db.put("counter", 1);

  // Get value of key 'a': 1
  const value = await db.get("counter");
  console.log(value);
})();
