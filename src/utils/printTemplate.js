  import jsPDF from "jspdf"

  export const downloadRecipePDF = async (
    recipe,
    ingredients,
    instructions,
    stats
  ) => {
    const doc = new jsPDF("p", "mm", "a4")

    const pageWidth = 210
    const pageHeight = 297
    const margin = 20
    const contentWidth = pageWidth - margin * 2

    let y = margin

    // =========================
    // HEADER WITH BRANDING
    // =========================

    // Brand bar
    doc.setFillColor(255, 107, 107)
    doc.rect(margin, y - 8, contentWidth, 5, "F")

    // Brand text
    doc.setFont("helvetica", "bold")
    doc.setFontSize(8)
    doc.setTextColor(255, 255, 255)
    doc.text("COOKING BOSS", margin, y - 4)

    y += 8

    // Recipe title
    doc.setFont("helvetica", "bold")
    doc.setFontSize(32)
    doc.setTextColor(30, 30, 30)

    doc.text(recipe.strMeal.toUpperCase(), margin, y + 8)

    y += 18

    // Meta info
    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.setTextColor(100)

    doc.text(
      `${recipe.strArea} Cuisine • ${recipe.strCategory}`,
      margin,
      y
    )

    y += 8

    // Description
    const description = `${recipe.strMeal} is a delicious ${recipe.strCategory.toLowerCase()} recipe from ${recipe.strArea}.`

    const splitDescription = doc.splitTextToSize(
      description,
      contentWidth
    )

    doc.setFont("helvetica", "italic")
    doc.text(splitDescription, margin, y)

    y += splitDescription.length * 5 + 15

    // =========================
    // IMAGE
    // =========================

    try {
      const imgData = await getImageData(recipe.strMealThumb)

      // Calculate aspect ratio to prevent stretching
      const imgWidth = contentWidth
      const imgHeight = (imgWidth * 200) / 400

      // Add border
      doc.setDrawColor(229, 229, 229)
      doc.setLineWidth(0.5)
      doc.rect(margin - 1, y - 1, imgWidth + 2, imgHeight + 2)

      doc.addImage(
        imgData,
        "JPEG",
        margin,
        y,
        imgWidth,
        imgHeight
      )

      y += imgHeight + 20
    } catch (err) {
      console.log(err)
    }

    // =========================
    // STATS BAR
    // =========================

    doc.setFillColor(245, 245, 245)

    doc.roundedRect(
      margin,
      y,
      contentWidth,
      18,
      3,
      3,
      "F"
    )

    y += 10

    doc.setFont("helvetica", "bold")
    doc.setFontSize(9)
    doc.setTextColor(40)

    const statsData = [
      `TIME: ${stats.duration} min`,
      `SERVES: ${stats.servings}`,
      `INGREDIENTS: ${ingredients.length}`,
    ]

    let statX = margin + 12

    statsData.forEach((item) => {
      doc.text(item, statX, y)
      statX += 65
    })

    y += 20

    // =========================
    // STACKED LAYOUT
    // =========================

    const contentX = margin

    let currentY = y

    // =========================
    // INGREDIENTS
    // =========================

    doc.setFont("helvetica", "bold")
    doc.setFontSize(16)
    doc.setTextColor(30)

    doc.text("INGREDIENTS", contentX, currentY)

    currentY += 10

    doc.setDrawColor(255, 107, 107)
    doc.setLineWidth(2)
    doc.line(contentX, currentY, contentX + 50, currentY)

    currentY += 12

    ingredients.forEach((ing) => {
      if (currentY > pageHeight - margin - 30) {
        // Add horizontal rule before page break
        doc.setDrawColor(229, 229, 229)
        doc.setLineWidth(0.5)
        doc.line(contentX, currentY, contentX + contentWidth, currentY)
        
        doc.addPage()
        currentY = margin
        
        // Add section header on new page
        doc.setFont("helvetica", "bold")
        doc.setFontSize(16)
        doc.setTextColor(30)
        doc.text("INGREDIENTS (continued)", contentX, currentY)
        currentY += 10
      }

      // bullet
      doc.setFillColor(255, 107, 107)

      doc.circle(contentX + 2, currentY - 1.5, 1.5, "F")

      // quantity
      doc.setFont("helvetica", "bold")
      doc.setFontSize(9)
      doc.setTextColor(20)

      doc.text(ing.measure, contentX + 7, currentY)

      // ingredient
      const measureWidth = doc.getTextWidth(ing.measure)

      doc.setFont("helvetica", "normal")
      doc.setTextColor(70)

      doc.text(
        ing.ingredient,
        contentX + measureWidth + 10,
        currentY
      )

      currentY += 8
    })

    // =========================
    // HORIZONTAL RULE BETWEEN SECTIONS
    // =========================

    currentY += 15

    doc.setDrawColor(229, 229, 229)
    doc.setLineWidth(1)
    doc.line(contentX, currentY, contentX + contentWidth, currentY)

    currentY += 15

    // =========================
    // DIRECTIONS (below ingredients)
    // =========================

    doc.setFont("helvetica", "bold")
    doc.setFontSize(16)
    doc.setTextColor(30)

    doc.text("DIRECTIONS", contentX, currentY)

    currentY += 10

    doc.setDrawColor(255, 107, 107)
    doc.setLineWidth(2)
    doc.line(contentX, currentY, contentX + 50, currentY)

    currentY += 12

    instructions.forEach((step, index) => {
      if (currentY > pageHeight - margin - 30) {
        // Add horizontal rule before page break
        doc.setDrawColor(229, 229, 229)
        doc.setLineWidth(0.5)
        doc.line(contentX, currentY, contentX + contentWidth, currentY)
        
        doc.addPage()
        currentY = margin
        
        // Add section header on new page
        doc.setFont("helvetica", "bold")
        doc.setFontSize(16)
        doc.setTextColor(30)
        doc.text("DIRECTIONS (continued)", contentX, currentY)
        currentY += 10
      }

      // Step box
      doc.setFillColor(255, 107, 107)

      doc.roundedRect(
        contentX,
        currentY - 4,
        6,
        6,
        1,
        1,
        "F"
      )

      doc.setFont("helvetica", "bold")
      doc.setFontSize(8)
      doc.setTextColor(255)

      doc.text(
        `${index + 1}`,
        contentX + 3,
        currentY,
        {
          align: "center",
        }
      )

      // step text
      doc.setFont("helvetica", "normal")
      doc.setFontSize(9)
      doc.setTextColor(60)

      const splitText = doc.splitTextToSize(
        step,
        contentWidth - 12
      )

      doc.text(splitText, contentX + 10, currentY)

      currentY += splitText.length * 4.5 + 10
    })

    // =========================
    // FOOTER WITH BRANDING
    // =========================

    const totalPages = doc.internal.getNumberOfPages()

    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)

      // Footer background
      doc.setFillColor(245, 245, 245)
      doc.rect(margin, pageHeight - 15, contentWidth, 15, "F")

      // Branding
      doc.setFont("helvetica", "bold")
      doc.setFontSize(8)
      doc.setTextColor(100)
      doc.text("COOKING BOSS", margin, pageHeight - 10)

      // Date
      doc.setFont("helvetica", "normal")
      doc.setFontSize(7)
      doc.setTextColor(140)
      doc.text(new Date().toLocaleDateString(), margin, pageHeight - 5)

      // Page number
      doc.text(
        `Page ${i} of ${totalPages}`,
        pageWidth - margin - 25,
        pageHeight - 8
      )
    }

    // =========================
    // SAVE
    // =========================

    const filename = recipe.strMeal
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "")

    doc.save(`${filename}_recipe.pdf`)
  }

  async function getImageData(url) {
    const response = await fetch(url)

    const blob = await response.blob()

    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onloadend = () => resolve(reader.result)

      reader.onerror = reject

      reader.readAsDataURL(blob)
    })
  }