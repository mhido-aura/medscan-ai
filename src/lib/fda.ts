export async function getMedicineData(medicineName: string) {
  const response = await fetch(
    `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${medicineName}`
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}