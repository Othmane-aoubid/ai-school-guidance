from weasyprint import HTML, CSS
from jinja2 import Environment, FileSystemLoader
import os
# Setup Jinja2 environment
template_dir = os.path.join(os.path.dirname(
    os.path.dirname(__file__)), 'templates')
nv = Environment(loader=FileSystemLoader(template_dir))


def generate_resume_pdf(data):
    try:
        template_style = data['template']['style']

        # Select template based on template ID
        template_map = {
            1: 'professional.html',
            2: 'modern.html',
            3: 'minimal.html'
        }

        template_name = template_map.get(data['template']['id'])
        if not template_name:
            raise ValueError('Invalid template ID')
         # Get the template
        template = os.env.get_template(template_name)

        # Render HTML
        html_content = template.render(
            personal_info=data['content']['personalInfo'],
            summary=data['content']['summary'],
            experience=data['content']['experience'],
            education=data['content']['education'],
            projects=data['content']['projects'],
            skills=data['content']['skills'],
            certifications=data['content']['certifications'],
            languages=data['content']['languages'],
            style=template_style,
            styling=data['styling']
        )
        # Define CSS
        css = CSS(string=f'''
            @page {{
                size: letter;
                margin: 1cm;
            }}
            body {{
                font-family: {data['styling']['font']}, sans-serif;
                font-size: {data['styling']['fontSize']}px;
                line-height: 1.5;
                color: #333333;
            }}
            .section-title {{
                color: {template_style['sectionTitleColor']};
                border-bottom: 2px solid {data['styling']['primaryColor']};
                padding-bottom: 0.3em;
                margin-top: 1em;
            }}
            .header {{
                background-color: {template_style['headerBg']};
                color: {template_style['headerText']};
                padding: 2em;
                text-align: center;
            }}
        ''')
        # Generate PDF
        pdf = HTML(string=html_content).write_pdf(
            stylesheets=[css],
            presentational_hints=True
        )
        return pdf
    except Exception as e:
        raise Exception(f"PDF generation failed: {str(e)}")
