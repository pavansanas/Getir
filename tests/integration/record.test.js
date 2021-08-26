const request = require("supertest");
const app = require("../../app_config");
const dalRecords = require("../../src/dal/record_dal");

describe("validation of /v0/records ", () => {
  it("should return 400 for wrong minCount", async () => {
    const { body } = await request(app).post("/v0/records").send({
      startDate: "2016-01-26",
      endDate: "2018-02-02",
      minCount: "",
      maxCount: 3000,
    });
    expect(body.error_message).toBe(" minCount:it should be number");
    expect(body.internal_code).toBe(400);
  });

  it("should return 400 for wrong startDate", async () => {
    const { body } = await request(app).post("/v0/records").send({
      startDate: "2016-13-26",
      endDate: "2018-02-02",
      minCount: 1,
      maxCount: 3000,
    });
    expect(body.error_message).toBe(
      " startDate:date format should be yyyy-MM-dd"
    );
    expect(body.internal_code).toBe(400);
  });

  it("should return 400 for wrong startDate and minCount", async () => {
    const { body } = await request(app).post("/v0/records").send({
      startDate: "2016-13-26",
      endDate: "2018-02-02",
      minCount: "",
      maxCount: 3000,
    });
    expect(body.error_message).toBe(
      " startDate:date format should be yyyy-MM-dd, minCount:it should be number"
    );
    expect(body.internal_code).toBe(400);
  });
});

describe("/v0/records sucessfuly result ", () => {
  it("should call dalRecords.getRecord", async () => {
    dalRecords.getRecord = jest.fn();
    await request(app).post("/v0/records").send({
      startDate: "2016-11-26",
      endDate: "2018-02-02",
      minCount: 1,
      maxCount: 3000,
    });
    expect(dalRecords.getRecord).toBeCalled();
  });
  it("should return a result", async () => {
    const getRecordMock = jest.fn();
    getRecordMock.mockReturnValue([
      {
        key: "UFYsJHDM",
        createdAt: "2016-09-06T04:08:44.393Z",
        totalCount: 2951,
      },
    ]);
    dalRecords.getRecord = getRecordMock;
    const response = await request(app).post("/v0/records").send({
      startDate: "2016-11-26",
      endDate: "2018-02-02",
      minCount: 1,
      maxCount: 3000,
    });
    expect(response.status).toBe(200);
    expect(response.body.msg).toBe("Success");
    expect(response.body.code).toBe(200);
    expect(response.body.records[0].key).toBe("UFYsJHDM");
  });

  it("should call dalRecords.getRecord", async () => {
    dalRecords.getRecord = jest.fn();
    await request(app).post("/v0/records").send({
      startDate: "2016-11-26",
      endDate: "2018-02-02",
      minCount: 1,
      maxCount: 3000,
    });
    expect(dalRecords.getRecord).toBeCalled();
  });
  it("should fail result", async () => {
    const getRecordMock = jest.fn();
    getRecordMock.mockImplementation(() => {
      throw new Error("failed to fetch");
    });
    dalRecords.getRecord = getRecordMock;
    const response = await request(app).post("/v0/records").send({
      startDate: "2016-11-26",
      endDate: "2018-02-02",
      minCount: 1,
      maxCount: 3000,
    });
    console.log(response.body);
    expect(response.status).toBe(500);
    expect(response.body.internal_code).toBe(500);
    expect(response.body.error_message).toBe("Server Error. failed to fetch");
  });
});
