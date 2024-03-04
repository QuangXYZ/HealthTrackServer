import { HealthCycle } from "../models/index.js"

const insertHealthCycle = async ({ idUser, menstrualCycleStart, cycleLength, dailyLog }) => {
  const nextMenstrualCycle = new Date(menstrualCycleStart);
  nextMenstrualCycle.setDate(nextMenstrualCycle.getDate() + cycleLength);

  const ovulationDate = new Date(nextMenstrualCycle);
  ovulationDate.setDate(ovulationDate.getDate() - 15);

  const fertilityWindowStart = new Date(ovulationDate);
  fertilityWindowStart.setDate(fertilityWindowStart.getDate() - 2);

  const fertilityWindowEnd = new Date(ovulationDate);
  fertilityWindowEnd.setDate(fertilityWindowEnd.getDate() + 2);

  const healthCycle = await HealthCycle.create({
    idUser,
    menstrualCycleStart,
    cycleLength,
    ovulationDate,
    fertilityWindowStart,
    fertilityWindowEnd,
    nextMenstrualCycle,
    dailyLog,
  });

  // await healthCycle.save();
  return healthCycle;
};

const updateHealthCycle = async ({ idUser, menstrualCycleStart, newData }) => {
  try {
    const existingRecord = await HealthCycle.findOne({ idUser, menstrualCycleStart });
    // existingRecord.cycleLength = newData.cycleLength || existingRecord.cycleLength;
    if (!existingRecord) {
      throw new Error('Health activity not found for the given idUser and date.');
    }

    const nextMenstrualCycle = new Date(newData.menstrualCycleStart);
    nextMenstrualCycle.setDate(nextMenstrualCycle.getDate() + newData.cycleLength);
    // existingRecord.nextMenstrualCycle = nextMenstrualCycle;

    const ovulationDate = new Date(nextMenstrualCycle);
    ovulationDate.setDate(ovulationDate.getDate() - 15);
    // existingRecord.ovulationDate = ovulationDate;

    const fertilityWindowStart = new Date(ovulationDate);
    fertilityWindowStart.setDate(fertilityWindowStart.getDate() - 2);
    // existingRecord.fertilityWindowStart = fertilityWindowStart;

    const fertilityWindowEnd = new Date(ovulationDate);
    fertilityWindowEnd.setDate(fertilityWindowEnd.getDate() + 2);
    // existingRecord.fertilityWindowEnd = fertilityWindowEnd;

    const updatedHealthCycle = await HealthCycle.findOneAndUpdate(
        {idUser, menstrualCycleStart},
        {
          $set: {
              cycleLength: newData.cycleLength ?? existingRecord.cycleLength,
              menstrualCycleStart: newData.menstrualCycleStart ?? existingRecord.menstrualCycleStart,
              ovulationDate: ovulationDate ?? existingRecord.ovulationDate,
              fertilityWindowStart: fertilityWindowStart ?? existingRecord.fertilityWindowStart,
              fertilityWindowEnd: fertilityWindowEnd ?? existingRecord.fertilityWindowEnd, 
          },
        },
        {new: true}
    );

    // const updatedHealthCycle = await existingRecord.save();
    return updatedHealthCycle;
  } catch (error) {
    throw error;
  }
};

// healthCycleRepository.js


// const updateHealthCycle = async ({ idUser, menstrualCycleStart, newData }) => {
//   try {
//     // Lấy thông tin hiện tại
//     const existingRecord = await HealthCycle.findOne({ idUser, menstrualCycleStart });

//     // Cập nhật thông tin chu kỳ
//     existingRecord.cycleLength = newData.cycleLength || existingRecord.cycleLength;

//     // Tính toán các giá trị mới dựa trên chu kỳ và kỳ kinh hiện tại
//     const nextMenstrualCycle = new Date(existingRecord.menstrualCycleStart);
//     nextMenstrualCycle.setDate(nextMenstrualCycle.getDate() + existingRecord.cycleLength);
//     existingRecord.nextMenstrualCycle = nextMenstrualCycle;

//     const ovulationDate = new Date(existingRecord.menstrualCycleStart);
//     ovulationDate.setDate(ovulationDate.getDate() + 17); // Có thể thay đổi số ngày tùy thuộc vào chu kỳ
//     existingRecord.ovulationDate = ovulationDate;

//     const fertilityWindowStart = new Date(ovulationDate);
//     fertilityWindowStart.setDate(fertilityWindowStart.getDate() - 5);
//     existingRecord.fertilityWindowStart = fertilityWindowStart;

//     const fertilityWindowEnd = new Date(ovulationDate);
//     existingRecord.fertilityWindowEnd = fertilityWindowEnd;

//     // Lưu lại và trả về dữ liệu sau khi cập nhật
//     const updatedHealthCycle = await existingRecord.save();
//     return updatedHealthCycle;
//   } catch (error) {
//     throw error;
//   }
// };


export default {
  insertHealthCycle,
  updateHealthCycle
}