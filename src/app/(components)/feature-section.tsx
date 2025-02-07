import React from "react";
import { AlertCircleIcon, BellIcon, SearchIcon } from "lucide-react";

export function FeatureSection() {
  const features = [
    {
      icon: <SearchIcon className="h-8 w-8" />,
      title: "Busca Avançada",
      description:
        "Encontre rapidamente projetos de lei e atividades parlamentares com nossa ferramenta de busca intuitiva.",
    },
    {
      icon: <BellIcon className="h-8 w-8" />,
      title: "Alertas Personalizados",
      description:
        "Receba notificações sobre temas de seu interesse e acompanhe o progresso de projetos específicos.",
    },
    {
      icon: <AlertCircleIcon className="h-8 w-8" />,
      title: "Análise em Tempo Real",
      description:
        "Acompanhe votações e decisões importantes do Congresso Nacional em tempo real.",
    },
  ];

  return (
    <div
      className="py-20 border-t border-zinc-200 dark:border-zinc-800"
    >
      <h2
        className="text-3xl font-bold text-center mb-16 text-black dark:text-white"
      >
        Por que escolher o LegisLab?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center space-y-4"
            id={`rwwszw_${index}`}
          >
            <div
              className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white"
              id={`omst0s_${index}`}
            >
              {feature.icon}
            </div>
            <h3
              className="text-xl font-semibold text-black dark:text-white"
              id={`25rc56_${index}`}
            >
              {feature.title}
            </h3>
            <p
              className="text-zinc-600 dark:text-zinc-400"
              id={`ejxf72_${index}`}
            >
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
