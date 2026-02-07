#!/usr/bin/env python3
"""
Script para convertir Markdown a PDF con formato profesional
Usa reportlab para crear PDFs con mejor maquetado
"""

import sys
import re
from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm, mm
from reportlab.lib.colors import HexColor, black, grey
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, 
    Table, TableStyle, ListFlowable, ListItem, Preformatted,
    KeepTogether, Image, HRFlowable
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont


class MarkdownToPDF:
    def __init__(self, input_file, output_file):
        self.input_file = input_file
        self.output_file = output_file
        self.styles = getSampleStyleSheet()
        self._setup_custom_styles()
        
    def _setup_custom_styles(self):
        """Configura estilos personalizados para el PDF"""
        
        # Estilo para título principal
        self.styles.add(ParagraphStyle(
            name='CustomTitle',
            parent=self.styles['Title'],
            fontSize=24,
            textColor=HexColor('#1a1a1a'),
            spaceAfter=30,
            spaceBefore=0,
            alignment=TA_CENTER,
            fontName='Helvetica-Bold'
        ))
        
        # Estilo para encabezados H1
        self.styles.add(ParagraphStyle(
            name='CustomHeading1',
            parent=self.styles['Heading1'],
            fontSize=18,
            textColor=HexColor('#2c3e50'),
            spaceAfter=12,
            spaceBefore=20,
            fontName='Helvetica-Bold',
            borderPadding=(0, 0, 8, 0),
            borderColor=HexColor('#3498db'),
            borderWidth=0,
            leftIndent=0
        ))
        
        # Estilo para encabezados H2
        self.styles.add(ParagraphStyle(
            name='CustomHeading2',
            parent=self.styles['Heading2'],
            fontSize=14,
            textColor=HexColor('#34495e'),
            spaceAfter=10,
            spaceBefore=16,
            fontName='Helvetica-Bold'
        ))
        
        # Estilo para encabezados H3
        self.styles.add(ParagraphStyle(
            name='CustomHeading3',
            parent=self.styles['Heading3'],
            fontSize=12,
            textColor=HexColor('#566573'),
            spaceAfter=8,
            spaceBefore=12,
            fontName='Helvetica-Bold'
        ))
        
        # Estilo para texto normal
        self.styles.add(ParagraphStyle(
            name='CustomBody',
            parent=self.styles['Normal'],
            fontSize=10,
            textColor=HexColor('#2c3e50'),
            alignment=TA_JUSTIFY,
            spaceAfter=8,
            spaceBefore=0,
            leading=14
        ))
        
        # Estilo para código
        self.styles.add(ParagraphStyle(
            name='CustomCode',
            parent=self.styles['Code'],
            fontSize=9,
            textColor=HexColor('#c7254e'),
            backColor=HexColor('#f9f2f4'),
            fontName='Courier',
            leftIndent=20,
            rightIndent=20,
            spaceAfter=10,
            spaceBefore=10
        ))
        
        # Estilo para bloques de código
        self.styles.add(ParagraphStyle(
            name='CodeBlock',
            parent=self.styles['Code'],
            fontSize=8,
            fontName='Courier',
            textColor=HexColor('#2c3e50'),
            backColor=HexColor('#f4f4f4'),
            leftIndent=15,
            rightIndent=15,
            spaceAfter=12,
            spaceBefore=12,
            borderPadding=8,
            borderWidth=1,
            borderColor=HexColor('#ddd')
        ))
        
        # Estilo para citas
        self.styles.add(ParagraphStyle(
            name='CustomQuote',
            parent=self.styles['Normal'],
            fontSize=10,
            textColor=HexColor('#555555'),
            leftIndent=30,
            rightIndent=30,
            spaceAfter=10,
            spaceBefore=10,
            borderPadding=10,
            borderColor=HexColor('#3498db'),
            borderWidth=1,
            borderRadius=None,
        ))
        
    def parse_markdown(self, content):
        """Convierte markdown a elementos de reportlab"""
        story = []
        lines = content.split('\n')
        i = 0
        
        in_code_block = False
        code_block = []
        code_lang = None
        
        in_list = False
        list_items = []
        
        while i < len(lines):
            line = lines[i]
            
            # Bloques de código
            if line.startswith('```'):
                if in_code_block:
                    # Fin del bloque de código
                    code_text = '\n'.join(code_block)
                    story.append(Preformatted(code_text, self.styles['CodeBlock']))
                    story.append(Spacer(1, 6))
                    code_block = []
                    in_code_block = False
                    code_lang = None
                else:
                    # Inicio del bloque de código
                    in_code_block = True
                    code_lang = line[3:].strip()
                i += 1
                continue
            
            if in_code_block:
                code_block.append(line)
                i += 1
                continue
            
            # Saltar líneas vacías
            if not line.strip():
                if in_list:
                    # Terminar lista
                    if list_items:
                        story.append(ListFlowable(list_items, bulletType='bullet', leftIndent=20))
                        story.append(Spacer(1, 6))
                        list_items = []
                    in_list = False
                else:
                    story.append(Spacer(1, 6))
                i += 1
                continue
            
            # Encabezados
            if line.startswith('# '):
                if in_list and list_items:
                    story.append(ListFlowable(list_items, bulletType='bullet', leftIndent=20))
                    story.append(Spacer(1, 6))
                    list_items = []
                    in_list = False
                
                text = line[2:].strip()
                story.append(Paragraph(text, self.styles['CustomHeading1']))
                story.append(HRFlowable(width="100%", thickness=2, color=HexColor('#3498db'), 
                                       spaceAfter=12, spaceBefore=0))
                
            elif line.startswith('## '):
                if in_list and list_items:
                    story.append(ListFlowable(list_items, bulletType='bullet', leftIndent=20))
                    story.append(Spacer(1, 6))
                    list_items = []
                    in_list = False
                    
                text = line[3:].strip()
                story.append(Paragraph(text, self.styles['CustomHeading2']))
                
            elif line.startswith('### '):
                if in_list and list_items:
                    story.append(ListFlowable(list_items, bulletType='bullet', leftIndent=20))
                    story.append(Spacer(1, 6))
                    list_items = []
                    in_list = False
                    
                text = line[4:].strip()
                story.append(Paragraph(text, self.styles['CustomHeading3']))
            
            # Separadores horizontales
            elif line.strip() in ['---', '***', '___']:
                if in_list and list_items:
                    story.append(ListFlowable(list_items, bulletType='bullet', leftIndent=20))
                    story.append(Spacer(1, 6))
                    list_items = []
                    in_list = False
                    
                story.append(Spacer(1, 12))
                story.append(HRFlowable(width="80%", thickness=1, color=HexColor('#bdc3c7'), 
                                       spaceAfter=12, spaceBefore=12))
            
            # Listas
            elif re.match(r'^\s*[-*+]\s+', line) or re.match(r'^\s*\d+\.\s+', line):
                in_list = True
                # Extraer el texto del item
                text = re.sub(r'^\s*[-*+\d.]+\s+', '', line)
                text = self._process_inline_markdown(text)
                list_items.append(ListItem(Paragraph(text, self.styles['CustomBody']), 
                                          leftIndent=0, bulletColor=HexColor('#3498db')))
            
            # Citas (blockquote)
            elif line.startswith('> '):
                if in_list and list_items:
                    story.append(ListFlowable(list_items, bulletType='bullet', leftIndent=20))
                    story.append(Spacer(1, 6))
                    list_items = []
                    in_list = False
                    
                text = line[2:].strip()
                text = self._process_inline_markdown(text)
                story.append(Paragraph(text, self.styles['CustomQuote']))
            
            # Código inline (línea completa)
            elif line.strip().startswith('`') and line.strip().endswith('`'):
                if in_list and list_items:
                    story.append(ListFlowable(list_items, bulletType='bullet', leftIndent=20))
                    story.append(Spacer(1, 6))
                    list_items = []
                    in_list = False
                    
                text = line.strip()[1:-1]
                story.append(Paragraph(text, self.styles['CustomCode']))
            
            # Texto normal
            else:
                if in_list:
                    # Continuar con el item de lista anterior
                    if list_items:
                        text = self._process_inline_markdown(line.strip())
                        list_items.append(ListItem(Paragraph(text, self.styles['CustomBody']), 
                                                  leftIndent=0, bulletColor=HexColor('#3498db')))
                else:
                    text = self._process_inline_markdown(line)
                    story.append(Paragraph(text, self.styles['CustomBody']))
            
            i += 1
        
        # Cerrar lista si queda abierta
        if in_list and list_items:
            story.append(ListFlowable(list_items, bulletType='bullet', leftIndent=20))
        
        return story
    
    def _process_inline_markdown(self, text):
        """Procesa elementos inline de markdown (negritas, cursivas, código, enlaces)"""
        # Escapar caracteres especiales de XML
        text = text.replace('&', '&amp;')
        text = text.replace('<', '&lt;')
        text = text.replace('>', '&gt;')
        
        # Código inline `code`
        text = re.sub(r'`([^`]+)`', r'<font name="Courier" color="#c7254e" backColor="#f9f2f4">\1</font>', text)
        
        # Negritas **text** o __text__
        text = re.sub(r'\*\*([^\*]+)\*\*', r'<b>\1</b>', text)
        text = re.sub(r'__([^_]+)__', r'<b>\1</b>', text)
        
        # Cursivas *text* o _text_
        text = re.sub(r'\*([^\*]+)\*', r'<i>\1</i>', text)
        text = re.sub(r'_([^_]+)_', r'<i>\1</i>', text)
        
        # Enlaces [text](url)
        text = re.sub(r'\[([^\]]+)\]\(([^\)]+)\)', r'<link href="\2" color="blue"><u>\1</u></link>', text)
        
        return text
    
    def add_header_footer(self, canvas, doc):
        """Añade encabezado y pie de página"""
        canvas.saveState()
        
        # Pie de página
        footer_text = f"Página {doc.page}"
        canvas.setFont('Helvetica', 9)
        canvas.setFillColor(grey)
        canvas.drawCentredString(A4[0] / 2, 1.5 * cm, footer_text)
        
        canvas.restoreState()
    
    def generate_pdf(self):
        """Genera el PDF a partir del markdown"""
        # Leer contenido
        with open(self.input_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Crear documento
        doc = SimpleDocTemplate(
            self.output_file,
            pagesize=A4,
            rightMargin=2*cm,
            leftMargin=2*cm,
            topMargin=2.5*cm,
            bottomMargin=2.5*cm,
            title="Apuntes Vibe Coding"
        )
        
        # Parsear markdown
        story = []
        
        # Título del documento (primera línea o título por defecto)
        lines = content.split('\n')
        title = "Apuntes Vibe Coding"
        content_start = 0
        
        # Buscar el primer encabezado H1 como título
        for i, line in enumerate(lines):
            if line.startswith('# '):
                title = line[2:].strip()
                content_start = i + 1
                break
        
        # Añadir portada
        story.append(Spacer(1, 4*cm))
        story.append(Paragraph(title, self.styles['CustomTitle']))
        story.append(Spacer(1, 1*cm))
        story.append(HRFlowable(width="60%", thickness=2, color=HexColor('#3498db')))
        story.append(Spacer(1, 0.5*cm))
        story.append(Paragraph("Apuntes generados automáticamente", self.styles['Normal']))
        story.append(PageBreak())
        
        # Añadir contenido
        content_to_parse = '\n'.join(lines[content_start:])
        story.extend(self.parse_markdown(content_to_parse))
        
        # Generar PDF
        doc.build(story, onFirstPage=self.add_header_footer, onLaterPages=self.add_header_footer)
        
        print(f"✓ PDF generado: {self.output_file}")


def main():
    if len(sys.argv) != 3:
        print("Uso: python3 md-to-pdf.py <input.md> <output.pdf>")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    
    if not Path(input_file).exists():
        print(f"Error: El archivo {input_file} no existe")
        sys.exit(1)
    
    converter = MarkdownToPDF(input_file, output_file)
    converter.generate_pdf()


if __name__ == '__main__':
    main()
