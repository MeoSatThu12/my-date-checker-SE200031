/**
 * daysInMonth.test.js
 * Unit Test cho hàm daysInMonth(year, month)
 *
 * Map với Lab 2 - Sheet DayInMonth (15 test cases):
 *   UTCID01-04 : Tháng 31 ngày        (Normal / Boundary)
 *   UTCID05-08 : Tháng 30 ngày        (Normal)
 *   UTCID09    : Feb, year % 400 = 0  → 29 (Boundary)
 *   UTCID10    : Feb, year % 100 = 0  → 28 (Boundary)
 *   UTCID11    : Feb, year % 4   = 0  → 29 (Normal)
 *   UTCID12    : Feb, không chia hết 4→ 28 (Normal)
 *   UTCID13-15 : Month không hợp lệ   → 0  (Abnormal)
 *
 * Chạy: npx jest daysInMonth.test.js
 */

const { daysInMonth } = require('../app');

// ================================================================
// NHÓM 1: Tháng có 31 ngày (1, 3, 5, 7, 8, 10, 12)
// ================================================================
describe('daysInMonth - Tháng có 31 ngày', () => {

    // UTCID01 | Month=1 | Year=2021 | Return=31 | Normal
    test('[UTCID01-N] Tháng 1 (January) → 31 ngày', () => {
        expect(daysInMonth(2021, 1)).toBe(31);
    });

    // UTCID02 | Month=3 | Year=2021 | Return=31 | Normal
    test('[UTCID02-N] Tháng 3 (March) → 31 ngày', () => {
        expect(daysInMonth(2021, 3)).toBe(31);
    });

    // UTCID03 | Month=7 | Year=2021 | Return=31 | Normal
    test('[UTCID03-N] Tháng 7 (July) → 31 ngày', () => {
        expect(daysInMonth(2021, 7)).toBe(31);
    });

    // UTCID04 | Month=12 | Year=2021 | Return=31 | Boundary (tháng hợp lệ lớn nhất có 31 ngày)
    test('[UTCID04-B] Tháng 12 (December) → 31 ngày [Boundary: tháng 31-ngày cuối]', () => {
        expect(daysInMonth(2021, 12)).toBe(31);
    });

});

// ================================================================
// NHÓM 2: Tháng có 30 ngày (4, 6, 9, 11)
// ================================================================
describe('daysInMonth - Tháng có 30 ngày', () => {

    // UTCID05 | Month=4 | Year=2021 | Return=30 | Normal
    test('[UTCID05-N] Tháng 4 (April) → 30 ngày', () => {
        expect(daysInMonth(2021, 4)).toBe(30);
    });

    // UTCID06 | Month=6 | Year=2021 | Return=30 | Normal
    test('[UTCID06-N] Tháng 6 (June) → 30 ngày', () => {
        expect(daysInMonth(2021, 6)).toBe(30);
    });

    // UTCID07 | Month=9 | Year=2021 | Return=30 | Normal
    test('[UTCID07-N] Tháng 9 (September) → 30 ngày', () => {
        expect(daysInMonth(2021, 9)).toBe(30);
    });

    // UTCID08 | Month=11 | Year=2021 | Return=30 | Normal
    test('[UTCID08-N] Tháng 11 (November) → 30 ngày', () => {
        expect(daysInMonth(2021, 11)).toBe(30);
    });

});

// ================================================================
// NHÓM 3: Tháng 2 – Kiểm tra toàn bộ nhánh năm nhuận
// Flowchart: %400=0 → 29 | %100=0 → 28 | %4=0 → 29 | else → 28
// ================================================================
describe('daysInMonth - Tháng 2 (năm nhuận)', () => {

    // UTCID09 | Month=2 | Year=2000 | Return=29 | Boundary
    // 2000 % 400 === 0 → năm nhuận
    test('[UTCID09-B] Tháng 2 / năm 2000 (chia hết 400) → năm nhuận → 29 ngày', () => {
        expect(daysInMonth(2000, 2)).toBe(29);
    });

    // UTCID10 | Month=2 | Year=1900 | Return=28 | Boundary
    // 1900 % 100 === 0 nhưng % 400 !== 0 → không nhuận
    test('[UTCID10-B] Tháng 2 / năm 1900 (chia hết 100, không chia hết 400) → không nhuận → 28 ngày', () => {
        expect(daysInMonth(1900, 2)).toBe(28);
    });

    // UTCID11 | Month=2 | Year=2020 | Return=29 | Normal
    // 2020 % 4 === 0 và % 100 !== 0 → năm nhuận
    test('[UTCID11-N] Tháng 2 / năm 2020 (chia hết 4, không chia hết 100) → năm nhuận → 29 ngày', () => {
        expect(daysInMonth(2020, 2)).toBe(29);
    });

    // UTCID12 | Month=2 | Year=2021 | Return=28 | Normal
    // 2021 % 4 !== 0 → không nhuận
    test('[UTCID12-N] Tháng 2 / năm 2021 (không chia hết 4) → không nhuận → 28 ngày', () => {
        expect(daysInMonth(2021, 2)).toBe(28);
    });

});

// ================================================================
// NHÓM 4: Tháng không hợp lệ → trả về 0 (Abnormal)
// ================================================================
describe('daysInMonth - Tháng không hợp lệ', () => {

    // UTCID13 | Month=0 | Year=2021 | Return=0 | Abnormal
    test('[UTCID13-A] Tháng 0 (dưới phạm vi) → trả về 0', () => {
        expect(daysInMonth(2021, 0)).toBe(0);
    });

    // UTCID14 | Month=13 | Year=2021 | Return=0 | Abnormal
    test('[UTCID14-A] Tháng 13 (trên phạm vi) → trả về 0', () => {
        expect(daysInMonth(2021, 13)).toBe(0);
    });

    // UTCID15 | Month=-1 | Year=2021 | Return=0 | Abnormal
    test('[UTCID15-A] Tháng -1 (số âm) → trả về 0', () => {
        expect(daysInMonth(2021, -1)).toBe(0);
    });

});