import { ButtonGroup, Button } from "@mantine/core";
import { useResourceContext } from "../../contexts/ResourceContext.jsx";

const ScopeDelegator = ({ scopeConfig, setScopes, scopes }) => {
  switch (scopeConfig.type) {
    case 'buttons':
      return <ScopeButtonGroup scopeConfig={scopeConfig} setScopes={setScopes} scopes={scopes} />;
    default:
      return null;
  }
}

const ScopeButtonGroup = ({ scopeConfig, setScopes, scopes }) => {
  const toggleScope = (value) => {
    const scopeExists = scopes.some(scope => scope.name == value);
    if (scopeExists) {
      setScopes((prevScopes) => prevScopes.filter(scope => scope.name != value));
    } else {
      setScopes(([...scopes, { name: value }]));
    }
  }

  return (
    <ButtonGroup className="scope-button-group margin-right" spacing="xs">
      {scopeConfig.options.map((option) => (
        <Button
          key={option.value}
          variant="outline"
          color={scopes.some(scope => scope.name === option.value) ? 'indigo' : 'gray'}
          size="xs"
          onClick={() => toggleScope(option.value)}
          className="scope-button"
        >
          {scopes.some(scope => scope.name === option.value) && option.activeLabel ? option.activeLabel : option.label}
        </Button>
      ))}
    </ButtonGroup>
  );
}

const HatchlessScopes = ({ scopeConfigs }) => {
  const { scopes, setScopes } = useResourceContext();

  return (
    <div className="hatchless-scopes">
      {scopeConfigs.map((scope, index) => (
        <div key={index} className="scope-item">
          <ScopeDelegator
            key={scope.name}
            scopeConfig={scope}
            setScopes={setScopes}
            scopes={scopes}
          />
        </div>
      ))}
    </div>
  );
}

export default HatchlessScopes;