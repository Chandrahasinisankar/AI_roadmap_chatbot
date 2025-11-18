using System;
using System.Threading.Tasks;
using System.Globalization;
using Google.GenAI;
using Google.GenAI.Types;

public class Program
{
	public static async Task Main()
	{
		// API key hardcoded per user request. Warning: hardcoding secrets is insecure for production.
		string apiKey = "";

		var client = new Client(apiKey: apiKey);

		Console.WriteLine("\n--- Personalized Roadmap Generator ---\n");
		Console.Write("Target company (optional): ");
			string? company = Console.ReadLine()?.Trim();

		Console.Write("Desired role: ");
			string? role = Console.ReadLine()?.Trim();

		Console.Write("Sector : ");
			string? sector = Console.ReadLine()?.Trim();

		Console.Write("Desired salary: ");
			string? salary = Console.ReadLine()?.Trim();

		Console.Write("Timeframe in months: ");
			string? timeframeInput = Console.ReadLine()?.Trim();
		int months = 3;
		if (!int.TryParse(timeframeInput, NumberStyles.Integer, CultureInfo.InvariantCulture, out months) || months <= 0)
		{
			months = 3;
		}

		Console.Write("Weekly study hours available: ");
			string? hoursInput = Console.ReadLine()?.Trim();
		int hoursPerWeek = 10;
		if (!int.TryParse(hoursInput, NumberStyles.Integer, CultureInfo.InvariantCulture, out hoursPerWeek) || hoursPerWeek <= 0)
		{
			hoursPerWeek = 10;
		}

		string startDate = DateTime.UtcNow.Date.ToString("yyyy-MM-dd");

		// Build a detailed system prompt instructing the model to act as an industrial expert mentor.
		string prompt = $@"You are an experienced industrial AI/career mentor. Produce a clear, step-by-step, practical roadmap and learning guide tailored to the user's inputs. Provide both a human-friendly plan and a compact summary.

User inputs:
- target_company: '{company ?? string.Empty}'
- role: '{role ?? string.Empty}'
- sector: '{sector ?? string.Empty}'
- desired_salary: '{salary ?? string.Empty}'
- timeframe_months: {months}
- hours_per_week: {hoursPerWeek}
- start_date: {startDate}

Deliverables (must include all):
1) Short Overview: 2-3 sentences about the suitability and prioritized skills.
2) Goal Breakdown: Specific milestones aligned to the timeframe (monthly & weekly milestones). Include dates relative to start_date.
3) Weekly Schedule: A repeatable weekly study plan (hours/day and tasks) customized to hours_per_week.
4) Projects & Assessments: 2-4 practical projects, with deliverables and evaluation criteria.
5) Learning Resources: For each milestone include high-quality, real-time resource links (articles, official docs, courses, YouTube, GitHub repos). Provide full URLs.
6) Interview Prep & Hiring Strategy: Company-targeted resume/LinkedIn checklist, technical and behavioral interview topics, sample questions, and a mock-interview schedule.
7) Salary & Role Strategy: Advice on targeting roles and negotiating salary for the given sector and company. Include realistic salary ranges and negotiation talking points where possible.
8) Timeline Table: Compact timeline listing milestone -> target date.
9) Summary: A user-readable title with key points: overview, milestones, weeklySchedule, resources, projects, interviewPrep, timeline

Formatting:
- First provide the human-readable plan with clear headings and bullet points.
- After the human-readable section, output structured tables (schedules, resources, projects, Learning Resources, Interview Prep, Timeline) and other details that was suggested as a summary of contents in multiple table forms.
- Prioritize actionable, measurable steps. Use short sentences and numbered lists.
- When timeframe is short (<=3 months), focus on high-impact skills, projects, and interview prep; when longer, include deeper study and certifications.

Return the output in English. Use up-to-date public links (official docs, major MOOC providers, GitHub, or reputable blogs).";

		try
		{
			Console.WriteLine("\nGenerating your personalized roadmap (this may take a moment)...\n");

			var response = await client.Models.GenerateContentAsync(
				model: "gemini-2.0-flash",
				contents: prompt
			);

			var text = response?.Candidates?[0]?.Content?.Parts?[0]?.Text;
			if (string.IsNullOrWhiteSpace(text))
			{
				Console.WriteLine("No response or empty response from the model.");
				return;
			}

			Console.WriteLine(text);
		}
		catch (Exception ex)
		{
			Console.WriteLine($"Error while calling the GenAI API: {ex.Message}");
			Console.WriteLine("Make sure your API key is valid and the network is available.");
		}
	}
}
