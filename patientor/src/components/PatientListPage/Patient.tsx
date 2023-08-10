import { TableRow, TableCell, Button } from "@mui/material"
import HealthRatingBar from "../HealthRatingBar"
import { Patient } from "../../types"
import { Link } from "react-router-dom";

interface PatientProps {
  patient: Patient;
}
const PatientItem = ({ patient }: PatientProps) => (
  <TableRow key={patient.id}>
    <TableCell>
      <Button component={Link} to={`/patients/${patient.id}`} variant="contained" color="primary">
        {patient.name}
      </Button>
    </TableCell>
    <TableCell>{patient.gender}</TableCell>
    <TableCell>{patient.occupation}</TableCell>
    <TableCell>
      <HealthRatingBar showText={false} rating={1} />
    </TableCell>
  </TableRow>
)

export default PatientItem;