/**
 * checkDate.test.js
 * Integration Test cho API endpoint POST /api/check-date
 *
 * Dùng supertest gửi HTTP request đến Express app
 * mà KHÔNG cần khởi động server thật.
 *
 * Map với Lab 2 - Sheet CheckDate (15 test cases):
 *   UTCID01-05 : Ngày hợp lệ thông thường        (Normal)
 *   UTCID06-08 : Ngày hợp lệ boundary             (Boundary)
 *   UTCID09    : Feb 29 năm không nhuận div100    (Boundary → False)
 *   UTCID10    : Day > DaysInMonth                (Abnormal → False)
 *   UTCID11    : Feb 29 năm không nhuận           (Boundary → False)
 *   UTCID12-13 : Day ngoài phạm vi                (Abnormal → False)
 *   UTCID14-15 : Month ngoài phạm vi              (Abnormal → False)
 *
 * Message format thực tế từ app.js:
 *   Format lỗi : "Input data for Day/Month/Year is incorrect format!"
 *   Out of range: "Input data for Day/Month/Year is out of range!"
 *   Valid       : "${d}/${m}/${y} is correct date time!"
 *   Invalid     : "${d}/${m}/${y} is NOT correct date time!"
 *
 * Chạy: npx jest checkDate.test.js
 */

const request = require('supertest');
const { app } = require('../app');

// ================================================================
// NHÓM 1: Ngày HỢP LỆ – API trả về success: true
// ================================================================
describe('POST /api/check-date - Ngày hợp lệ (Normal)', () => {

    // UTCID01 | Day=15 | Month=6 | Year=2021 | Return=True | Normal
    test('[UTCID01-N] 15/6/2021 - ngày bình thường hợp lệ', async () => {
        const res = await request(app)
            .post('/api/check-date')
            .send({ day: '15', month: '6', year: '2021' });

        expect(res.body.success).toBe(true);
        expect(res.body.message).toContain('correct date time');
    });

    // UTCID02 | Day=31 | Month=1 | Year=2021 | Return=True | Normal
    test('[UTCID02-N] 31/1/2021 - ngày cuối tháng 31 ngày', async () => {
        const res = await request(app)
            .post('/api/check-date')
            .send({ day: '31', month: '1', year: '2021' });

        expect(res.body.success).toBe(true);
        expect(res.body.message).toContain('correct date time');
    });

    // UTCID03 | Day=30 | Month=11 | Year=2021 | Return=True | Normal
    test('[UTCID03-N] 30/11/2021 - ngày cuối tháng 30 ngày', async () => {
        const res = await request(app)
            .post('/api/check-date')
            .send({ day: '30', month: '11', year: '2021' });

        expect(res.body.success).toBe(true);
        expect(res.body.message).toContain('correct date time');
    });

    // UTCID04 | Day=28 | Month=2 | Year=2021 | Return=True | Normal
    test('[UTCID04-N] 28/2/2021 - ngày 28 tháng 2 năm không nhuận', async () => {
        const res = await request(app)
            .post('/api/check-date')
            .send({ day: '28', month: '2', year: '2021' });

        expect(res.body.success).toBe(true);
        expect(res.body.message).toContain('correct date time');
    });

    // UTCID05 | Day=29 | Month=2 | Year=2020 | Return=True | Normal
    // 2020 % 4 === 0 và % 100 !== 0 → năm nhuận → Feb có 29 ngày
    test('[UTCID05-N] 29/2/2020 - ngày 29 tháng 2 năm nhuận (chia hết 4)', async () => {
        const res = await request(app)
            .post('/api/check-date')
            .send({ day: '29', month: '2', year: '2020' });

        expect(res.body.success).toBe(true);
        expect(res.body.message).toContain('correct date time');
    });

});

// ================================================================
// NHÓM 2: Ngày HỢP LỆ – Boundary (biên hợp lệ)
// ================================================================
describe('POST /api/check-date - Ngày hợp lệ (Boundary)', () => {

    // UTCID06 | Day=1 | Month=1 | Year=2021 | Return=True | Boundary
    // Biên nhỏ nhất hợp lệ của Day và Month
    test('[UTCID06-B] 1/1/2021 - biên dưới của Day=1 và Month=1', async () => {
        const res = await request(app)
            .post('/api/check-date')
            .send({ day: '1', month: '1', year: '2021' });

        expect(res.body.success).toBe(true);
        expect(res.body.message).toContain('correct date time');
    });

    // UTCID07 | Day=31 | Month=12 | Year=2021 | Return=True | Boundary
    // Biên lớn nhất hợp lệ của Day=31 và Month=12
    test('[UTCID07-B] 31/12/2021 - biên trên của Day=31 và Month=12', async () => {
        const res = await request(app)
            .post('/api/check-date')
            .send({ day: '31', month: '12', year: '2021' });

        expect(res.body.success).toBe(true);
        expect(res.body.message).toContain('correct date time');
    });

    // UTCID08 | Day=29 | Month=2 | Year=2000 | Return=True | Boundary
    // 2000 % 400 === 0 → năm nhuận → Feb có 29 ngày
    test('[UTCID08-B] 29/2/2000 - năm 2000 chia hết 400 → năm nhuận', async () => {
        const res = await request(app)
            .post('/api/check-date')
            .send({ day: '29', month: '2', year: '2000' });

        expect(res.body.success).toBe(true);
        expect(res.body.message).toContain('correct date time');
    });

});

// ================================================================
// NHÓM 3: Ngày KHÔNG HỢP LỆ – Boundary (biên không hợp lệ)
// ================================================================
describe('POST /api/check-date - Ngày không hợp lệ (Boundary)', () => {

    // UTCID09 | Day=29 | Month=2 | Year=1900 | Return=False | Boundary
    // 1900 % 100 === 0 nhưng % 400 !== 0 → không nhuận → Feb chỉ có 28 ngày
    test('[UTCID09-B] 29/2/1900 - năm 1900 chia hết 100 nhưng không chia hết 400 → không nhuận', async () => {
        const res = await request(app)
            .post('/api/check-date')
            .send({ day: '29', month: '2', year: '1900' });

        expect(res.body.success).toBe(false);
        expect(res.body.message).toContain('NOT correct date time');
    });

    // UTCID11 | Day=29 | Month=2 | Year=2021 | Return=False | Boundary
    // 2021 % 4 !== 0 → không nhuận → Feb chỉ có 28 ngày
    test('[UTCID11-B] 29/2/2021 - năm 2021 không chia hết 4 → không nhuận → Feb chỉ có 28 ngày', async () => {
        const res = await request(app)
            .post('/api/check-date')
            .send({ day: '29', month: '2', year: '2021' });

        expect(res.body.success).toBe(false);
        expect(res.body.message).toContain('NOT correct date time');
    });

});

// ================================================================
// NHÓM 4: Ngày KHÔNG HỢP LỆ – Day vượt số ngày của tháng (Abnormal)
// ================================================================
describe('POST /api/check-date - Day vượt quá số ngày trong tháng (Abnormal)', () => {

    // UTCID10 | Day=31 | Month=4 | Year=2021 | Return=False | Abnormal
    // Tháng 4 chỉ có 30 ngày → Day=31 không hợp lệ
    test('[UTCID10-A] 31/4/2021 - tháng 4 chỉ có 30 ngày → ngày 31 không hợp lệ', async () => {
        const res = await request(app)
            .post('/api/check-date')
            .send({ day: '31', month: '4', year: '2021' });

        expect(res.body.success).toBe(false);
        expect(res.body.message).toContain('NOT correct date time');
    });

});

// ================================================================
// NHÓM 5: Day ngoài phạm vi [1-31] (Abnormal)
// ================================================================
describe('POST /api/check-date - Day ngoài phạm vi (Abnormal)', () => {

    // UTCID12 | Day=0 | Month=6 | Year=2021 | Return=False | Abnormal
    test('[UTCID12-A] Day=0 - dưới biên min=1 → out of range', async () => {
        const res = await request(app)
            .post('/api/check-date')
            .send({ day: '0', month: '6', year: '2021' });

        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Input data for Day is out of range!');
    });

    // UTCID13 | Day=32 | Month=1 | Year=2021 | Return=False | Abnormal
    test('[UTCID13-A] Day=32 - trên biên max=31 → out of range', async () => {
        const res = await request(app)
            .post('/api/check-date')
            .send({ day: '32', month: '1', year: '2021' });

        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Input data for Day is out of range!');
    });

});

// ================================================================
// NHÓM 6: Month ngoài phạm vi [1-12] (Abnormal)
// ================================================================
describe('POST /api/check-date - Month ngoài phạm vi (Abnormal)', () => {

    // UTCID14 | Day=15 | Month=0 | Year=2021 | Return=False | Abnormal
    test('[UTCID14-A] Month=0 - dưới biên min=1 → out of range', async () => {
        const res = await request(app)
            .post('/api/check-date')
            .send({ day: '15', month: '0', year: '2021' });

        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Input data for Month is out of range!');
    });

    // UTCID15 | Day=15 | Month=13 | Year=2021 | Return=False | Abnormal
    test('[UTCID15-A] Month=13 - trên biên max=12 → out of range', async () => {
        const res = await request(app)
            .post('/api/check-date')
            .send({ day: '15', month: '13', year: '2021' });

        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Input data for Month is out of range!');
    });

});

// ================================================================
// NHÓM 7: Sai định dạng – không phải số nguyên (Abnormal)
// ================================================================
describe('POST /api/check-date - Sai định dạng input (Abnormal)', () => {

    test('[Extra] Day là chữ "abc" → incorrect format', async () => {
        const res = await request(app)
            .post('/api/check-date')
            .send({ day: 'abc', month: '6', year: '2021' });

        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Input data for Day is incorrect format!');
    });

    test('[Extra] Day là số thực "1.5" → incorrect format', async () => {
        const res = await request(app)
            .post('/api/check-date')
            .send({ day: '1.5', month: '6', year: '2021' });

        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Input data for Day is incorrect format!');
    });

    test('[Extra] Day rỗng "" → incorrect format', async () => {
        const res = await request(app)
            .post('/api/check-date')
            .send({ day: '', month: '6', year: '2021' });

        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Input data for Day is incorrect format!');
    });

    test('[Extra] Month là chữ "xyz" → incorrect format', async () => {
        const res = await request(app)
            .post('/api/check-date')
            .send({ day: '15', month: 'xyz', year: '2021' });

        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Input data for Month is incorrect format!');
    });

    test('[Extra] Year là chữ "abcd" → incorrect format', async () => {
        const res = await request(app)
            .post('/api/check-date')
            .send({ day: '15', month: '6', year: 'abcd' });

        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Input data for Year is incorrect format!');
    });

    test('[Extra] Year ngoài phạm vi 999 → out of range', async () => {
        const res = await request(app)
            .post('/api/check-date')
            .send({ day: '15', month: '6', year: '999' });

        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Input data for Year is out of range!');
    });

    test('[Extra] Year ngoài phạm vi 3001 → out of range', async () => {
        const res = await request(app)
            .post('/api/check-date')
            .send({ day: '15', month: '6', year: '3001' });

        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Input data for Year is out of range!');
    });

});