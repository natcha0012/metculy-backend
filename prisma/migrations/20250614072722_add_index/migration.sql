-- CreateIndex
CREATE INDEX "appointment_doctor_id_idx" ON "appointment"("doctor_id");

-- CreateIndex
CREATE INDEX "appointment_patient_id_idx" ON "appointment"("patient_id");

-- CreateIndex
CREATE INDEX "appointment_date_idx" ON "appointment"("date");
