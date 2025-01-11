import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "~/config/environment";

// Khởi tạo đối tượng trelloDatabaseInstance ban đầu là null vì chúng ta chưa connect db
let trelloDatabaseInstance = null;

// Khởi tạo đối tượng mongoClientInstance để connect tới db
const mongoClientInstance = new MongoClient(env.MONGODB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Kết nối tới database
export const CONNECT_DB = async () => {
  // Gọi kết nối đến MongoDB Atlas với URL đã khai báo trong thân của mongoClientInstance
  await mongoClientInstance.connect();

  // Kết nối thành công thì lấy Database theo tên và gán ngược lại vào biến trelloDatabaseInstance
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME);
};

// Hàm GET_DB không async này có nhiệm vụ export ra cái trelloDatabaseInstance sau khi đã connect thành công tới MongoDB
// để chúng ta sử dụng lại ở nhiều nơi khác nhau
// Lưu ý: phải đảm bảo chỉ luôn gọi GET_DB sau khi đã kết nối thành công tới MongoDB
export const GET_DB = () => {
  if (!trelloDatabaseInstance)
    throw new Error("Must connect to database first!");

  return trelloDatabaseInstance;
};

export const CLOSE_DB = async () => {
  await mongoClientInstance.close();
};
