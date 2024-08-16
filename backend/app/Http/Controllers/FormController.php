<?php

namespace App\Http\Controllers;

use App\Models\PassportForm;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use thiagoalessio\TesseractOCR\TesseractOCR;

class FormController extends Controller
{
    public function uploadImage(Request $request)
    {
        try {
            // Validate the image
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            // Store the image
            $image = $request->file('image');
            $path = $image->store('images', 'public');

            // Perform OCR on the image
            $ocrText = (new TesseractOCR(storage_path('app/public/' . $path)))
                ->executable(env('TESSERACT_PATH', '/usr/local/bin/tesseract'))
                ->run();

            // Extract all fields
            $name = $this->extractField($ocrText, 'Name');
            $dob = $this->extractField($ocrText, 'Date of Birth');
            $pob = $this->extractField($ocrText, 'Place of Birth');
            $age = $this->extractField($ocrText, 'Age');
            $address = $this->extractField($ocrText, 'Address');
            $gender = $this->extractField($ocrText, 'Gender');
            $nationality = $this->extractField($ocrText, 'Nationality');
            $passportNumber = $this->extractField($ocrText, 'Passport Number');
            $dateOfIssue = $this->extractField($ocrText, 'Date of Issue');
            $dateOfExpiry = $this->extractField($ocrText, 'Date of Expiry');
            $placeOfIssue = $this->extractField($ocrText, 'Place of Issue');
            $authority = $this->extractField($ocrText, 'Authority');

            return response()->json([
                'name' => $name,
                'date_of_birth' => $dob,
                'place_of_birth' => $pob,
                'age' => $age,
                'address' => $address,
                'gender' => $gender,
                'nationality' => $nationality,
                'passport_number' => $passportNumber,
                'date_of_issue' => $dateOfIssue,
                'date_of_expiry' => $dateOfExpiry,
                'place_of_issue' => $placeOfIssue,
                'authority' => $authority
            ]);
        } catch (Exception $e) {
            Log::error($e);
            return response()->json(['error' => 'Error processing the image'], 500);
        }
    }

    public function submitForm(Request $request)
    {
        try {
            // Save form data in the database
            $data = PassportForm::create($request->all());

            return response()->json([
                'status' => 'success',
                'message' => 'Form submitted successfully',
                'data' => $data,
            ]);
        } catch (Exception $e) {
            Log::error($e);
            return response()->json(['error' => 'Error saving form data'], 500);
        }
    }


    private function extractField($text, $field)
    {
        // Use a regular expression to match the desired field and value
        preg_match('/' . $field . '\s*:\s*(.*?)(\n|$)/i', $text, $matches);
        return trim($matches[1] ?? '');
    }
}
