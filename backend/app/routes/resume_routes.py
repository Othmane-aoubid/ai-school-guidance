from flask import Blueprint, request, jsonify, send_file
from app.utils.pdf_generator import generate_resume_pdf
import io
resume_bp = Blueprint('resume', __name__)
@resume_bp.route('/api/generate-pdf', methods=['POST'])
def generate_pdf():
    try:
       data = request.json
       
       # Validate required fields
       required_fields = ['template', 'styling', 'content']
       if not all(field in data for field in required_fields):
           return jsonify({'error': 'Missing required fields'}), 400
        # Generate PDF using the utility function
       pdf_content = generate_resume_pdf(data)
       
       # Return the PDF file
       return send_file(
           io.BytesIO(pdf_content),
           mimetype='application/pdf',
           as_attachment=True,
           download_name='resume.pdf'
       )
    except Exception as e:
        print(f"Error generating PDF: {str(e)}")
        return jsonify({'error': str(e)}), 500
@resume_bp.route('/api/templates', methods=['GET'])
def get_templates():
   templates = [
       {
           'id': 1,
           'name': 'Professional',
           'preview': '/templates/professional.png',
           'description': 'Clean and professional template suitable for traditional industries'
       },
       {
           'id': 2,
           'name': 'Modern',
           'preview': '/templates/modern.png',
           'description': 'Contemporary design perfect for creative roles'
       },
       {
           'id': 3,
           'name': 'Minimal',
           'preview': '/templates/minimal.png',
           'description': 'Simple and elegant design focusing on content'
       }
   ]
   return jsonify(templates);