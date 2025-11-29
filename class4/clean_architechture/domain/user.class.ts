export class User {
    name: string;
    dob: string; // expected as a date-string (e.g. "1990-01-31")
    email: string;
    password: string;

    // Validations as per requirements
    validation = (): { valid: boolean; errors: string[] } => {
        const errors: string[] = [];

        // DOB checks
        if (this.dob) {
            const dobDate = new Date(this.dob);
            const now = new Date();
            if (isNaN(dobDate.getTime()) || dobDate >= now) {
                errors.push('dob must be a valid date in the past');
            }
            if (isNaN(dobDate.getTime())) {
                errors.push('dob is not a valid date');
            } else {
                const today = new Date();
                let age = today.getFullYear() - dobDate.getFullYear();
                const monthDiff = today.getMonth() - dobDate.getMonth();
                if (
                    monthDiff < 0 ||
                    (monthDiff === 0 && today.getDate() < dobDate.getDate())
                ) {
                    age--;
                }

                if (age < 18) {
                    errors.push('user must be at least 18 years old');
                }
            }
        }

        return { valid: errors.length === 0, errors };
    };
}
